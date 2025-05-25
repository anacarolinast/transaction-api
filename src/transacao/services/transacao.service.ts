import { Injectable } from '@nestjs/common';
import { CreateTransacaoDto } from '../dto/create-transacao.dto'; 
import {
  CamposObrigatoriosException,
  ValorInvalidoException,
  DataHoraInvalidaException,
} from '../exceptions/transacao.exceptions';

@Injectable()
export class TransacaoService {
  async add(dto: CreateTransacaoDto): Promise<void> {
    this.validarCamposObrigatorios(dto);
    this.validarValor(dto.valor);
    this.validarDataHora(dto.dataHora);
  }

  private validarCamposObrigatorios(dto: CreateTransacaoDto): void {
    if (dto.valor === undefined || dto.dataHora === undefined) {
      throw new CamposObrigatoriosException();
    }
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
}
