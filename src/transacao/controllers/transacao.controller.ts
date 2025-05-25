import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common';
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

  @Get()
  @HttpCode(200)
  async getAll(): Promise<CreateTransacaoDto[]> {
    const transacoes = await this.transacaoService.getAll();
    return transacoes;
  }

  @Delete()
  @HttpCode(200)
  async clear(): Promise<void> {
    await this.transacaoService.clear();
  }
}
