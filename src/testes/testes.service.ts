import { Injectable } from '@nestjs/common';
import { CreateTestisDto } from './dto/create-testis.dto';
import { UpdateTestisDto } from './dto/update-testis.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Testes } from './schemas/testes.schema';
import { Model } from 'mongoose';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class TestesService {
  constructor(@InjectModel(Testes.name) private testeModel: Model<Testes>) {}

  async create(createTestisDto: CreateTestisDto): Promise<Testes> {
    const createTeste = new this.testeModel(createTestisDto);
    return createTeste.save();
  }

  async findAll(): Promise<Testes[]> {
    return this.testeModel.find().exec();
  }

  async findOne(id: string): Promise<Testes> {
    return this.testeModel.findById(id);
  }

  async update(id: string, updateTestisDto: UpdateTestisDto) {
    return await this.testeModel.updateOne(
      { _id: id },
      {
        testValue: updateTestisDto?.testValue,
        otherValue: updateTestisDto?.otherValue,
      },
    );
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.testeModel.deleteOne({ _id: id });
  }
}
