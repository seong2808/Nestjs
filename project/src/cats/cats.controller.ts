import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  getAllCat() {
    return 'all cat';
  }
  // cats/:id
  @Get(':id')
  getOneCat() {
    return 'one cat';
  }
  // cats/
  @Post()
  createCat() {
    return 'create cat';
  }
  // cats/:id
  @Put(':id')
  updateCat() {
    return 'update cat';
  }
  // cats/:id
  @Patch(':id')
  updatePartialCat() {
    return 'update';
  }
  // cats/:id
  @Delete(':id')
  deleteCat() {
    return 'delete service';
  }
}
