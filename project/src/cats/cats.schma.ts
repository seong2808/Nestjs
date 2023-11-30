import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, HydratedDocument, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

export type CatDocument = HydratedDocument<Cat>;

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'seong@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({ require: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'amamov',
    description: 'name',
    required: true,
  })
  @Prop({ require: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123123',
    description: 'password',
    required: true,
  })
  @Prop({ require: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    email: this.email,
    name: this.name,
  };
});