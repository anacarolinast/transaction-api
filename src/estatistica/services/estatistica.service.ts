import { Injectable } from '@nestjs/common';
import { TransacaoService } from '../../transacao/services/transacao.service';
import { Estatistica } from '../interfaces/estatistica.interface';

@Injectable()
export class EstatisticaService {
  private static readonly INTERVALO_UM_MINUTO_MS = 60_000;

  constructor(private readonly transacaoService: TransacaoService) {}

  async calcularEstatisticas(): Promise<Estatistica> {
    const agora = Date.now();
    const transacoes = await this.transacaoService.getAll();

    const transacoesRecentes = transacoes.filter(({ dataHora }) => {
      const diff = agora - new Date(dataHora).getTime();
      return diff >= 0 && diff <= EstatisticaService.INTERVALO_UM_MINUTO_MS;
    });

    if (!transacoesRecentes.length) {
      return { count: 0, sum: 0, avg: 0, min: 0, max: 0 };
    }

    const valores = transacoesRecentes.map(({ valor }) => valor);
    const sum = valores.reduce((acc, val) => acc + val, 0);
    const count = valores.length;

    return {
      count,
      sum,
      avg: sum / count,
      min: Math.min(...valores),
      max: Math.max(...valores),
    };
  }
}
