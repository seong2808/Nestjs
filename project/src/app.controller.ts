import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // * localhost:3000/
  @Get('') // 데코레이터 -> 함수나 클래스에 기능을 첨가한다. 재사용성을 극대화시킨다. @Get() === @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }
}
