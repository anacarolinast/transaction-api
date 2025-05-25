import { UnprocessableEntityException } from '@nestjs/common';

export class CamposObrigatoriosException extends UnprocessableEntityException {
  constructor() {
    super('Campos obrigatórios faltando');
  }
}

export class ValorInvalidoException extends UnprocessableEntityException {
  constructor() {
    super('Valor não pode ser negativo');
  }
}

export class DataHoraInvalidaException extends UnprocessableEntityException {
  constructor() {
    super('Data/hora inválida ou no futuro');
  }
}
