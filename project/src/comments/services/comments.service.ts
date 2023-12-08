import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../dtos/comments.create.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'hi';
  }

  async createComments(id: string, comments: CommentsCreateDto) {
    console.log(comments);
    return 'hi';
  }

  async plusLike(id: string) {}
}
