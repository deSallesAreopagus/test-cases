import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestesService } from './testes.service';
import { CreateTestesDto } from './dto/create-testes.dto';
import { UpdateTestesDto } from './dto/update-testes.dto';

@Controller('testes')
export class TestesController {
  constructor(private readonly testesService: TestesService) {}

  @Post()
  create(@Body() createTestisDto: CreateTestesDto) {
    return this.testesService.create(createTestisDto);
  }

  @Get()
  findAll() {
    return this.testesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestisDto: UpdateTestesDto) {
    return this.testesService.update(id, updateTestisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testesService.remove(id);
  }
}
