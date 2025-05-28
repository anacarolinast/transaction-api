import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { EstatisticaDto } from '../dto/estatistica-response.dto';
import { EstatisticaService } from '../services/estatistica.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('estatistica')
@Controller('estatistica')
export class EstatisticaController {
  constructor(private readonly estatisticaService: EstatisticaService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Obtenha dados estatísticos' })
  @ApiResponse({
    status: 200,
    description: 'Retorna os dados estatísticos',
    type: EstatisticaDto,
  })
  @ApiQuery({
    name: 'intervaloMs',
    required: false,
    description: 'Intervalo em milissegundos para calcular as estatísticas (padrão: 60000)',
    example: 120000,
  })
  async getEstatisticas(
    @Query('intervaloMs') intervaloMs?: string,
  ): Promise<EstatisticaDto> {
    const intervalo = intervaloMs ? Number(intervaloMs) : undefined;
    return this.estatisticaService.calcularEstatisticas(intervalo);
  }
}
