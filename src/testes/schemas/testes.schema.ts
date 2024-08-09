import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestesDocument = HydratedDocument<Testes>;

@Schema()
export class Testes {
  @Prop()
  id: number;

  @Prop()
  testValue: string;

  @Prop()
  otherValue: number;
}

export const TestesSchema = SchemaFactory.createForClass(Testes);
