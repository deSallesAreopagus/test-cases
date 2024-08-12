import { Test, TestingModule } from '@nestjs/testing';
import { TestesController } from './testes.controller';
import { TestesService } from './testes.service';
import { CreateTestesDto } from './dto/create-testes.dto';

describe('TestesController', () => {
  let controller: TestesController;
  let service: TestesService;
  const mockTestesDto: CreateTestesDto = {
    testValue: 'Testes jest 1',
    otherValue: 123,
  };

  const mockTeste = {
    _id: '1',
    testValue: 'Testes jest 1',
    otherValue: 123,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestesController],
      providers: [
        {
          provide: TestesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                testValue: 'Testes jest 1',
                otherValue: 123,
              },
              {
                testValue: 'Testes jest 2',
                otherValue: 234,
              },
              {
                testValue: 'Testes jest 3',
                otherValue: 345,
              },
            ]),
            findOne: jest.fn().mockResolvedValue(mockTeste),
            create: jest.fn().mockResolvedValue(mockTestesDto),
            remove: jest.fn().mockResolvedValue({
              _id: '1',
              testValue: 'Teste jest 1',
              otherValue: 123,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<TestesController>(TestesController);
    service = module.get<TestesService>(TestesService);
  });

  describe('findAll', () => {
    it('should return all testes', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          testValue: 'Testes jest 1',
          otherValue: 123,
        },
        {
          testValue: 'Testes jest 2',
          otherValue: 234,
        },
        {
          testValue: 'Testes jest 3',
          otherValue: 345,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a teste by ID', async () => {
      expect(controller.findOne('1')).resolves.toEqual(mockTeste);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new teste', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockTeste);

      await controller.create(mockTestesDto);
      expect(createSpy).toHaveBeenCalledWith(mockTestesDto);
    });
  });

  describe('findByIdAndDelete', () => {
    it('should delete a teste by ID', async () => {
      const mockDeleteResult = {
        _id: '1',
        testValue: 'Teste jest 1',
        otherValue: 123,
      };
      const createSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce(mockDeleteResult);

      const result = await controller.remove('1');
      expect(createSpy).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
