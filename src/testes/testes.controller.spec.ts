import { Test, TestingModule } from '@nestjs/testing';
import { TestesController } from './testes.controller';
import { TestesService } from './testes.service';
import { Testes } from './schemas/testes.schema';

describe('TestesController', () => {
  let controller: TestesController;
  let service: TestesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestesController],
      providers: [
        {
          provide: TestesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                testValue: 'Teste',
                otherValue: 1,
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<TestesController>(TestesController);
    service = module.get<TestesService>(TestesService);
  });

  describe('findAll', () => {
    it('should return all testes', async () => {
      const result: Testes[] = [
        {
          id: 1,
          testValue: 'Teste',
          otherValue: 1,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });
});
