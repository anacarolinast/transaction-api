import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsISO8601, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateTransacaoDto {
  @ApiProperty({ description: 'Valor da transação', example: 123.45 })
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  valor: number;

  @ApiProperty({ description: 'Data e hora da transação', example: '2025-05-26T10:55:00.789-03:00' })
  @IsISO8601()
  @IsNotEmpty()
  @IsDefined()
  dataHora: string;
}
