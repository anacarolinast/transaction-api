import { Module } from '@nestjs/common';
import { TransacaoController } from './controllers/transacao.controller'; 
import { TransacaoService } from './services/transacao.service';

@Module({
  controllers: [TransacaoController],
  providers: [TransacaoService],
  exports: [TransacaoService],
})
export class TransacaoModule {}
