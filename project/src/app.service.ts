import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // 비즈니스 로직이 실행이 되는 곳
    console.log('Hello World!');
    return 'Hello World!';
  }
}
