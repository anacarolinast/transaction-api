import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransacaoModule } from './transacao/transacao.module';
import { EstatisticaModule } from './estatistica/estatistica.module';

@Module({
  imports: [TransacaoModule, EstatisticaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
