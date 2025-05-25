import { Test, TestingModule } from '@nestjs/testing';
import { TransacaoController } from './transacao.controller';
import { TransacaoService } from '../services/transacao.service';
import { CreateTransacaoDto } from '../dto/create-transacao.dto';
import {
  CamposObrigatoriosException,
  ValorInvalidoException,
} from '../exceptions/transacao.exceptions';

describe('TransacaoController', () => {
  let controller: TransacaoController;
  let service: TransacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacaoController],
      providers: [
        {
          provide: TransacaoService,
          useValue: {
            add: jest.fn(),
            clear: jest.fn(),
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TransacaoController>(TransacaoController);
    service = module.get<TransacaoService>(TransacaoService);
  });

  it('Deve aceitar transação válida e retornar 201', async () => {
    const dto: CreateTransacaoDto = {
      valor: 100,
      dataHora: new Date().toISOString(),
    };

    (service.add as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(controller.create(dto)).resolves.toBeUndefined();
    expect(service.add).toHaveBeenCalledWith(dto);
  });

  it('Deve rejeitar transação inválida com 422', async () => {
    const dto: CreateTransacaoDto = {
      valor: -50,
      dataHora: new Date().toISOString(),
    };

    (service.add as jest.Mock).mockRejectedValueOnce(
      new ValorInvalidoException(),
    );

    await expect(controller.create(dto)).rejects.toThrow(
      ValorInvalidoException,
    );
  });

  it('Deve retornar 422 quando faltar campos obrigatórios', async () => {
    const dto: any = {
      dataHora: new Date().toISOString(),
    };

    (service.add as jest.Mock).mockRejectedValueOnce(
      new CamposObrigatoriosException(),
    );

    await expect(controller.create(dto)).rejects.toThrow(
      CamposObrigatoriosException,
    );
  });

  it('Deve retornar todas as transações', async () => {
    const transacoesMock: CreateTransacaoDto[] = [
      { valor: 100, dataHora: new Date().toISOString() },
      { valor: 50, dataHora: new Date().toISOString() },
    ];

    (service.getAll as jest.Mock).mockResolvedValueOnce(transacoesMock);

    const result = await controller.getAll();
    expect(result).toEqual(transacoesMock);
    expect(service.getAll).toHaveBeenCalled();
  });

  it('Deve limpar todas as transações', async () => {
    (service.clear as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(controller.clear()).resolves.toBeUndefined();
    expect(service.clear).toHaveBeenCalled();
  });
});
