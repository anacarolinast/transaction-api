import { IsNumber, IsISO8601, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateTransacaoDto {
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  valor: number;

  @IsISO8601()
  @IsNotEmpty()
  @IsDefined()
  dataHora: string;
}
