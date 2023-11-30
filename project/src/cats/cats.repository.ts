import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schma';
import { Model } from 'mongoose';
import { CatRequestDto } from './dto/cats.request.dto';

// Repository에서 try-catch를 통해 에러처리를 할 수 있지만 현재 mongoose를 통해 validation 검사를 하고 있기 때문에 사용하지 않는다.
// 하지만 에러처리가 잘 되지 않을 때도 있기 때문에 여기서도 에러처리를 해줄 수 있다!
@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    if (result) return true;
    else return false;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
