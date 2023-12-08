import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, HydratedDocument, SchemaOptions } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

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

  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

export const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  // Comments 스키마의 info에 대해서 가져온다. (외래키라고 생각하면 좋을 것 같다.)
  foreignField: 'info',
});
// populate(다른 Document와 이어줄 수 있는 매서드라고 생각하자)를 사용할 때 필요한 옵션 2가지!
// 객체로 변환이 가능
_CatSchema.set('toObject', { virtuals: true });
// JSON 형식으로 변환이 가능
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
