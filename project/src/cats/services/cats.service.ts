import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CatRequestDto } from '../dtos/cats.request.dto';
import { CatsRepository } from '../cats.repository';
import { Cat } from '../cats.schma';
import { AwsService } from 'src/aws.service';

@Injectable()
export class CatsService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly awsService: AwsService,
  ) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    // const fileName = `cats/${files[0].filename}`;
    const { key, s3Object, contentType } = await this.awsService.uploadFileToS3(
      'cats',
      files[0],
    );
    console.log(key, s3Object, contentType);
    const imgUrl = this.awsService.getAwsS3FileUrl(key);

    console.log(imgUrl);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      imgUrl,
    );
    console.log(newCat);
    return newCat;
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
      // throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403); === throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
