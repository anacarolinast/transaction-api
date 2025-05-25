import { TransacaoService } from './transacao.service';
import {
  CamposObrigatoriosException,
  ValorInvalidoException,
  DataHoraInvalidaException,
} from '../exceptions/transacao.exceptions';
import { CreateTransacaoDto } from '../dto/create-transacao.dto'; 

describe('TransacaoService', () => {
  let service: TransacaoService;

  beforeEach(() => {
    service = new TransacaoService();
  });

  it('Deve lançar CamposObrigatoriosException se valor ou dataHora forem undefined', async () => {
    const dto: CreateTransacaoDto = { valor: undefined, dataHora: undefined };
    await expect(service.add(dto)).rejects.toThrow(CamposObrigatoriosException);
  });

  it('Deve lançar ValorInvalidoException se valor for negativo', async () => {
    const dto: CreateTransacaoDto = {
      valor: -100,
      dataHora: '2023-01-01T00:00:00.000Z',
    };
    await expect(service.add(dto)).rejects.toThrow(ValorInvalidoException);
  });

  it('Deve lançar DataHoraInvalidaException se dataHora for inválida', async () => {
    const dto: CreateTransacaoDto = { valor: 100, dataHora: 'data-invalida' };
    await expect(service.add(dto)).rejects.toThrow(DataHoraInvalidaException);
  });

  it('Deve lançar DataHoraInvalidaException se dataHora for no futuro', async () => {
    const dataFutura = new Date(Date.now() + 10000).toISOString();
    const dto: CreateTransacaoDto = { valor: 100, dataHora: dataFutura };
    await expect(service.add(dto)).rejects.toThrow(DataHoraInvalidaException);
  });

  it('Deve passar se dto for válido', async () => {
    const dataValida = new Date().toISOString();
    const dto: CreateTransacaoDto = { valor: 100, dataHora: dataValida };
    await expect(service.add(dto)).resolves.toBeUndefined();
  });
});
