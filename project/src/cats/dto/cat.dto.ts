import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schma';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {}
