import { ApiProperty } from '@nestjs/swagger';

export class EstatisticaDto {
  @ApiProperty({ example: 10, description: 'Número total de transações' })
  count: number;

  @ApiProperty({ example: 1234.56, description: 'Soma dos valores das transações' })
  sum: number;

  @ApiProperty({ example: 123.45, description: 'Média dos valores das transações' })
  avg: number;

  @ApiProperty({ example: 50, description: 'Valor mínimo das transações' })
  min: number;

  @ApiProperty({ example: 200, description: 'Valor máximo das transações' })
  max: number;
}
