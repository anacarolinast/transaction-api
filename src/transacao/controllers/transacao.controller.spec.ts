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
          },
        },
      ],
    }).compile();

    controller = module.get<TransacaoController>(TransacaoController);
    service = module.get<TransacaoService>(TransacaoService);
  });

  it('deve aceitar transação válida e retornar 201', async () => {
    const dto: CreateTransacaoDto = {
      valor: 100,
      dataHora: new Date().toISOString(),
    };

    (service.add as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(controller.create(dto)).resolves.toBeUndefined();
    expect(service.add).toHaveBeenCalledWith(dto);
  });

  it('deve rejeitar transação inválida com 422', async () => {
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

  it('deve retornar 422 quando faltar campos obrigatórios', async () => {
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
});
