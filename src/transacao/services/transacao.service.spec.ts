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

  it('Deve retornar todas as transações adicionadas', async () => {
    const dto1: CreateTransacaoDto = { valor: 50, dataHora: new Date().toISOString() };
    const dto2: CreateTransacaoDto = { valor: 150, dataHora: new Date().toISOString() };
    await service.add(dto1);
    await service.add(dto2);

    const transacoes = await service.getAll();
    expect(transacoes).toHaveLength(2);
    expect(transacoes).toContainEqual(dto1);
    expect(transacoes).toContainEqual(dto2);
  });

  it('Deve limpar todas as transações', async () => {
    const dto: CreateTransacaoDto = { valor: 50, dataHora: new Date().toISOString() };
    await service.add(dto);
    await service.clear();

    const transacoes = await service.getAll();
    expect(transacoes).toHaveLength(0);
  });
});
