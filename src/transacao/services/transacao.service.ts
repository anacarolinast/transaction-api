import { Injectable } from '@nestjs/common';
import { CreateTransacaoDto } from '../dto/create-transacao.dto';
import {
  ValorInvalidoException,
  DataHoraInvalidaException,
} from '../exceptions/transacao.exceptions';
import { logger } from 'common/utils/logger'; 

@Injectable()
export class TransacaoService {
  private readonly transacoes: CreateTransacaoDto[] = [];

  async add(dto: CreateTransacaoDto): Promise<void> {
    try {
      this.validarValor(dto.valor);
      this.validarDataHora(dto.dataHora);

      this.transacoes.push(dto);
      logger.info(`Transação adicionada: Valor=${dto.valor}, dataHora=${dto.dataHora}`);
    } catch (error) {
      logger.error(`Erro ao adicionar transação: ${error.message}`);
      throw error;
    }
  }

  private validarValor(valor: number): void {
    if (valor < 0) {
      logger.warn(`Valor inválido detectado: ${valor}`);
      throw new ValorInvalidoException();
    }
  }

  private validarDataHora(dataHora: string): void {
    const data = new Date(dataHora);
    if (isNaN(data.getTime()) || data > new Date()) {
      logger.warn(`Data/hora inválida detectada: ${dataHora}`);
      throw new DataHoraInvalidaException();
    }
  }

  async getAll(): Promise<CreateTransacaoDto[]> {
    logger.info(`Recuperando todas as transações. Total: ${this.transacoes.length}`);
    return this.transacoes;
  }

  async clear(): Promise<void> {
    this.transacoes.length = 0;
    logger.info('Todas as transações foram limpas.');
  }
}
