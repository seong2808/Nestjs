import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

export type CatDocument = HydratedDocument<Cat>;

@Schema(options)
export class Cat {
  @Prop({ require: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ require: true })
  @IsString()
  @IsNotEmpty()
  name: string;

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
