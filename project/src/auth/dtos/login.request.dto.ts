import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats/cats.schma';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
