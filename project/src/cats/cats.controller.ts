import {
  Body,
  Controller,
  Get,
  //   HttpException,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('cats')
// 인터셉터 의존성 주입
@UseInterceptors(SuccessInterceptor)
// class 전역에 사용 가능
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  // cats/
  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  // cats/
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: 'Success!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  // cats/login/
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  // cats/logout/
  // 로그아웃 api를 필요없음, 프론트에서 jwt 삭제하면 로그아웃이 된다.
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logout() {
    return 'logout';
  }

  // cats/upload/cats/
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadimg';
  }
}
