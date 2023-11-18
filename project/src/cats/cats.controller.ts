import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
// class 전역에 사용 가능
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  // 아래 throw new HttpException에서 발생된 Exception이 UseFilters를 통해 HttpExceptionFilter에 필터링되어 response에 전달이 된다.
  //   @UseFilters(HttpExceptionFilter) --> class 안의 일부분일 떄 사용
  getAllCat() {
    // throw new HttpException({ success: false, message: 'api is broken' }, 401);
    throw new HttpException('api is broken', 401);
    return 'get all cat api';
  }
  // cats/:id
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) param: number) {
    console.log(param);
    console.log(typeof param);
    return 'get one cat api';
  }
  // cats/
  @Post()
  createCat() {
    return 'create cat api';
  }
  // cats/:id
  @Put(':id')
  updateCat() {
    return 'update cat api';
  }
  // cats/:id
  @Patch(':id')
  updatePartialCat() {
    return 'update partial cat api';
  }
  // cats/:id
  @Delete(':id')
  deleteCat() {
    return 'delete service';
  }
}
