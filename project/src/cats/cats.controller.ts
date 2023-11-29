import {
  Body,
  Controller,
  Delete,
  Get,
  //   HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
// 인터셉터 의존성 주입
@UseInterceptors(SuccessInterceptor)
// class 전역에 사용 가능
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  // cats/
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  // cats/login/
  @Post('login')
  async login() {
    return 'login';
  }

  // cats/logout/
  @Post('logout')
  async logout() {
    return 'logout';
  }

  // cats/upload/cats/
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadimg';
  }
}
