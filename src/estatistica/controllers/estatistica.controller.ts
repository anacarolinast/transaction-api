import { Controller, Get, HttpCode } from '@nestjs/common';
import { EstatisticaDto } from '../dto/estatistica-response.dto';
import { EstatisticaService } from '../services/estatistica.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
  async getEstatisticas(): Promise<EstatisticaDto> {
    return this.estatisticaService.calcularEstatisticas();
  }
}
