import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testes } from './schemas/testes.schema';
import { CreateTestisDto } from './dto/create-testis.dto';
import { UpdateTestisDto } from './dto/update-testis.dto';

@Injectable()
export class TestesService {
  constructor(
    @InjectModel(Testes.name) private readonly testeModel: Model<Testes>,
  ) {}

  async create(createTestisDto: CreateTestisDto): Promise<Testes> {
    const createTeste = new this.testeModel(createTestisDto);
    return createTeste.save();
  }

  async findAll(): Promise<Testes[]> {
    return this.testeModel.find().exec();
  }

  async findOne(id: string): Promise<Testes> {
    const teste = await this.testeModel.findById(id).exec();
    if (!teste) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return teste;
  }

  async update(id: string, updateTestisDto: UpdateTestisDto): Promise<Testes> {
    const updatedTeste = await this.testeModel
      .findByIdAndUpdate(id, updateTestisDto, { new: true })
      .exec();
    if (!updatedTeste) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return updatedTeste;
  }

  async remove(id: string): Promise<{ deletedCount?: number }> {
    const result = await this.testeModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return result;
  }
}
