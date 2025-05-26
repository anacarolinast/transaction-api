import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common';
import { CreateTransacaoDto } from '../dto/create-transacao.dto';
import { TransacaoService } from '../services/transacao.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('transacao')
@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Crie uma nova transação' })
  @ApiResponse({ status: 201, description: 'Transação criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  async create(@Body() createTransacaoDto: CreateTransacaoDto): Promise<void> {
    await this.transacaoService.add(createTransacaoDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Busque todas as transações' })
  @ApiResponse({ status: 200, description: 'Lista de transações retornada com sucesso.' })
  async getAll(): Promise<CreateTransacaoDto[]> {
    const transacoes = await this.transacaoService.getAll();
    return transacoes;
  }

  @Delete()
  @HttpCode(200)
  @ApiOperation({ summary: 'Limpe todas as transações' })
  @ApiResponse({ status: 200, description: 'Todas as transações foram removidas com sucesso.' })
  async clear(): Promise<void> {
    await this.transacaoService.clear();
  }
}
