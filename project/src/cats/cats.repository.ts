import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schma';
import { Model, Types } from 'mongoose';
import { CatRequestDto } from './dtos/cats.request.dto';
import { Comments } from 'src/comments/comments.schema';
// Repository에서 try-catch를 통해 에러처리를 할 수 있지만 현재 mongoose를 통해 validation 검사를 하고 있기 때문에 사용하지 않는다.
// 하지만 에러처리가 잘 되지 않을 때도 있기 때문에 여기서도 에러처리를 해줄 수 있다!
@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {}

  async findAll() {
    const result = await this.catModel
      .find()
      .populate({ path: 'comments', model: this.commentsModel });

    return result;
  }

  async findByIdAndUpdateImg(id: string, imgUrl: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = imgUrl;
    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    // select 매서드를 통해 비밀번호는 제외하고 가져온다!
    // 보안상 이유로 request.user에 저장할 때, password 필드를 제외하고 저장하는 것이 좋습니다.
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    if (result) return true;
    else return false;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
