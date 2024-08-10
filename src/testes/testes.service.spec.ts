import { Test, TestingModule } from '@nestjs/testing';
import { TestesService } from './testes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testes } from './schemas/testes.schema';
import { NotFoundException } from '@nestjs/common';
import { CreateTestisDto } from './dto/create-testis.dto';

describe('TestesService', () => {
  let service: TestesService;
  let model: Model<Testes>;
  const mockTestes = [
    { _id: '1', testValue: 'Teste 1', otherValue: 1 },
    { _id: '2', testValue: 'Teste 2', otherValue: 2 },
  ];

  const mockTestModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockTestes),
    }),
    findById: jest.fn().mockImplementation((id: string) => ({
      exec: jest
        .fn()
        .mockResolvedValue(
          mockTestes.find((teste) => teste._id === id) || null,
        ),
    })),
    create: jest.fn().mockImplementation((dto: CreateTestisDto) => {
      return {
        ...dto,
        save: jest.fn().mockResolvedValue({ _id: '3', ...dto }),
      };
    }),
    findByIdAndUpdate: jest.fn().mockImplementation((id, dto) => ({
      exec: jest.fn().mockResolvedValue({ _id: id, ...dto }),
    })),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };

  jest.mock('mongoose', () => ({
    Model: jest.fn().mockImplementation(() => mockTestModel),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestesService,
        {
          provide: getModelToken(Testes.name),
          useValue: mockTestModel,
        },
      ],
    }).compile();

    service = module.get<TestesService>(TestesService);
    model = module.get<Model<Testes>>(getModelToken(Testes.name));
  });

  it('should create a new test object', async () => {
    const newTest = { testValue: 'Teste 3', otherValue: 3 };
    const createdTest = { _id: '3', ...newTest };

    jest.spyOn(model, 'create').mockImplementation((dto: any) => ({
      ...dto,
      save: jest.fn().mockResolvedValue(createdTest),
    }));

    const result = await service.create(newTest);
    expect(result).toEqual(createdTest);
  });

  it('should return all tests objects', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockTestes);
  });

  it('should return one test object by ID', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual(mockTestes[0]);
  });

  it('should throw an error when a test object is not found', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(service.findOne('3')).rejects.toThrow(NotFoundException);
  });

  it('should update an existing test object', async () => {
    const updateTest = { testValue: 'Teste Updated', otherValue: 1 };
    const updatedTest = { _id: '1', ...updateTest };
    jest
      .spyOn(model, 'findByIdAndUpdate')
      .mockResolvedValue(updatedTest as any);

    const result = await service.update('1', updateTest);
    expect(result).toEqual(updatedTest);
  });

  it('should delete a test object by ID', async () => {
    const mockDeleteResult = { deletedCount: 1 };
    jest.spyOn(model, 'deleteOne').mockResolvedValue(mockDeleteResult as any);

    const result = await service.remove('1');
    expect(result.deletedCount).toEqual(1);
  });
});
