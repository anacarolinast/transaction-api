import { Injectable } from '@nestjs/common';
import { CreateTransacaoDto } from '../dto/create-transacao.dto';
import {
  ValorInvalidoException,
  DataHoraInvalidaException,
} from '../exceptions/transacao.exceptions';

@Injectable()
export class TransacaoService {
  private readonly transacoes: CreateTransacaoDto[] = [];

  async add(dto: CreateTransacaoDto): Promise<void> {
    this.validarValor(dto.valor);
    this.validarDataHora(dto.dataHora);

    this.transacoes.push(dto);
  }

  private validarValor(valor: number): void {
    if (valor < 0) {
      throw new ValorInvalidoException();
    }
  }

  private validarDataHora(dataHora: string): void {
    const data = new Date(dataHora);
    if (isNaN(data.getTime()) || data > new Date()) {
      throw new DataHoraInvalidaException();
    }
  }

  async getAll(): Promise<CreateTransacaoDto[]> {
    return this.transacoes;
  }

  async clear(): Promise<void> {
    this.transacoes.length = 0;
  }
}
