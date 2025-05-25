import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateTransacaoDto } from '../dto/create-transacao.dto'; 
import { TransacaoService } from '../services/transacao.service'; 

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}
  @Post()
  @HttpCode(201)
  async create(@Body() createTransacaoDto: CreateTransacaoDto): Promise<void> {
    await this.transacaoService.add(createTransacaoDto);
  }
}
