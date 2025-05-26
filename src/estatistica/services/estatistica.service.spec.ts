import { EstatisticaService } from './estatistica.service';
import { TransacaoService } from '../../transacao/services/transacao.service'; 
import { CreateTransacaoDto } from '../../transacao/dto/create-transacao.dto'; 

describe('EstatisticaService', () => {
  let estatisticaService: EstatisticaService;
  let transacaoService: TransacaoService;

  beforeEach(() => {
    transacaoService = {
      getAll: jest.fn(),
    } as any;

    estatisticaService = new EstatisticaService(transacaoService);
  });

  it('Deve retornar as estatísticas corretas para transações nos últimos 60 segundos', async () => {
    const now = new Date();
    const transacoesMock = [
      { valor: 100, dataHora: now.toISOString() },
      { valor: 50, dataHora: now.toISOString() },
    ];

    (transacaoService.getAll as jest.Mock).mockResolvedValue(transacoesMock);

    const estatisticas = await estatisticaService.calcularEstatisticas();

    expect(estatisticas).toEqual({
      count: 2,
      sum: 150,
      avg: 75,
      min: 50,
      max: 100,
    });
  });

  it('Deve retornar 0 para cada valor quando não houver transações nos últimos 60 segundos', async () => {
    const transacoes: CreateTransacaoDto[] = [
      {
        valor: 100,
        dataHora: new Date(Date.now() - 120000).toISOString(), 
      },
    ];

    (transacaoService.getAll as jest.Mock).mockResolvedValue(transacoes);

    const estatisticas = await estatisticaService.calcularEstatisticas();

    expect(estatisticas).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });
});
