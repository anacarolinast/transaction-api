import { Controller, Get, HttpCode } from '@nestjs/common';
import { Estatistica } from '../interfaces/estatistica.interface'; 
import { EstatisticaService } from '../services/estatistica.service';

@Controller('estatistica')
export class EstatisticaController {
  constructor(private readonly estatisticaService: EstatisticaService) {}

  @Get()
  @HttpCode(200)
  async getEstatisticas(): Promise<Estatistica> {
    return this.estatisticaService.calcularEstatisticas();
  }
}
