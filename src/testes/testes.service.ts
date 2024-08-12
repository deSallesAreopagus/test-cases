import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testes } from './schemas/testes.schema';
import { CreateTestesDto } from './dto/create-testes.dto';
import { UpdateTestesDto } from './dto/update-testes.dto';

@Injectable()
export class TestesService {
  constructor(
    @InjectModel(Testes.name) private readonly testeModel: Model<Testes>,
  ) {}

  async create(createTestesDto: CreateTestesDto): Promise<Testes> {
    const createTeste = await this.testeModel.create(createTestesDto);
    return createTeste;
  }

  async findAll(): Promise<Testes[]> {
    return this.testeModel.find().exec();
  }

  async findOne(id: string): Promise<Testes> {
    const teste = await this.testeModel.findOne({ _id: id }).exec();
    if (!teste) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return teste;
  }

  async update(id: string, updateTestesDto: UpdateTestesDto): Promise<Testes> {
    const updatedTeste = await this.testeModel
      .findByIdAndUpdate(id, updateTestesDto, { new: true })
      .exec();
    if (!updatedTeste) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return updatedTeste;
  }

  async remove(id: string): Promise<Testes> {
    const result = await this.testeModel.findByIdAndDelete({ _id: id }).exec();
    return result;
  }
}
