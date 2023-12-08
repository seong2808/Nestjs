import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schma';

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
