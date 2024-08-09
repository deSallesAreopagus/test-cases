import { Test, TestingModule } from '@nestjs/testing';
import { TestesService } from './testes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Testes } from './schemas/testes.schema';

describe('TestesService', () => {
  let service: TestesService;

  const execMock = jest.fn();
  const mockTestesRepository = {
    find: jest.fn().mockReturnValue({ exec: execMock }),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestesService,
        {
          provide: getModelToken(Testes.name),
          useValue: mockTestesRepository,
        },
      ],
    }).compile();

    service = module.get<TestesService>(TestesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all tests', async () => {
      const result: Testes[] = [
        {
          testValue: 'Teste',
          otherValue: 1,
        } as Testes,
      ];
      execMock.mockResolvedValueOnce(result);

      expect(await service.findAll()).toBe(result);
    });
  });
});
