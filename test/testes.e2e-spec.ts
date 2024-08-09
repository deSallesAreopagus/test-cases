import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestesModule } from '../src/testes/testes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TestesService } from '../src/testes/testes.service';
import { ConfigModule } from '@nestjs/config';

describe('TestesController (e2e)', () => {
  let app: INestApplication;
  const service = { findAll: () => [{ testValue: 'Teste 2', otherValue: 2 }] };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        TestesModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URL),
      ],
    })
      .overrideProvider(TestesService)
      .useValue(service)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET testes', async () => {
    return request(app.getHttpServer())
      .get('/testes')
      .expect(200)
      .expect(service.findAll());
  });
});
