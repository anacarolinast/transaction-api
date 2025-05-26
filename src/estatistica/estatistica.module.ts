import { Module } from '@nestjs/common';
import { EstatisticaController } from './controllers/estatistica.controller'; 
import { EstatisticaService } from './services/estatistica.service';
import { TransacaoModule } from 'src/transacao/transacao.module';

@Module({
  imports: [TransacaoModule],
  controllers: [EstatisticaController],
  providers: [EstatisticaService]
})

export class EstatisticaModule {}