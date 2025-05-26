import { Test, TestingModule } from '@nestjs/testing';
import { EstatisticaController } from './estatistica.controller';
import { EstatisticaService } from '../services/estatistica.service'; 

describe('EstatisticaController', () => {
  let controller: EstatisticaController;
  let service: EstatisticaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstatisticaController],
      providers: [
        {
          provide: EstatisticaService,
          useValue: {
            calcularEstatisticas: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EstatisticaController>(EstatisticaController);
    service = module.get<EstatisticaService>(EstatisticaService);
  });

  it('Deve retornar o cálculo das estatísticas', async () => {
    const estatisticasMock = {
      count: 2,
      sum: 150,
      avg: 75,
      min: 50,
      max: 100,
    };

    (service.calcularEstatisticas as jest.Mock).mockResolvedValue(estatisticasMock);

    const resultado = await controller.getEstatisticas();

    expect(resultado).toEqual(estatisticasMock);
  });
});