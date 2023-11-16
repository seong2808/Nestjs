import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // * localhost:3000/cats/hello
  @Get('hello/:id/:name') // 데코레이터 -> 함수나 클래스에 기능을 첨가한다. 재사용성을 극대화시킨다. @Get() === @Get('/')
  getHello(
    @Req() req: Request,
    @Body() body,
    @Param() param: { id: string; name: string },
  ): string {
    // console.log(req);
    console.log(param);
    return this.appService.getHello();
  }
}
