import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from 'src/users/user.schema';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post, PostStatus, PostType } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(postData: CreatePostDto, author: User) {
    return await this.postModel.create({
      ...postData,
      author: author.id,
      status:
        author.role === UserRole.ANGEL
          ? PostStatus.VERIFIED
          : PostStatus.UNAPPROVED,
    });
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }
}
