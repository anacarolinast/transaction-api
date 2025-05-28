import { Injectable } from '@nestjs/common';
import { TransacaoService } from '../../transacao/services/transacao.service';
import { EstatisticaDto } from '../dto/estatistica-response.dto';
import { logger } from 'common/utils/logger'; 

@Injectable()
export class EstatisticaService {
  constructor(private readonly transacaoService: TransacaoService) {}

  async calcularEstatisticas(intervaloMs = 60_000): Promise<EstatisticaDto> {
    const inicio = Date.now();

    const agora = Date.now();
    const transacoes = await this.transacaoService.getAll();

    const transacoesRecentes = transacoes.filter(({ dataHora }) => {
      const diff = agora - new Date(dataHora).getTime();
      return diff >= 0 && diff <= intervaloMs;
    });

    if (!transacoesRecentes.length) {
      const estatisticas = { count: 0, sum: 0, avg: 0, min: 0, max: 0 };
      logger.info(`Estatísticas calculadas em ${Date.now() - inicio}ms`);
      return estatisticas;
    }

    const valores = transacoesRecentes.map(({ valor }) => valor);
    const sum = valores.reduce((acc, val) => acc + val, 0);
    const count = valores.length;

    const estatisticas: EstatisticaDto = {
      count,
      sum: Number(sum.toFixed(2)),
      avg: Number((sum / count).toFixed(2)),
      min: Number(Math.min(...valores).toFixed(2)),
      max: Number(Math.max(...valores).toFixed(2)),
    };

    logger.info(`Estatísticas calculadas em ${Date.now() - inicio}ms`);
    return estatisticas;
  }
}
