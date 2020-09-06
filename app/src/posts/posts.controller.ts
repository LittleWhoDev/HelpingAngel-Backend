import { Body, Controller, Get, Req, Post as PostRoute } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post } from './post.schema';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @PostRoute()
  async create(@Body() postData: CreatePostDto, @Req() req) {
    return await this.create(postData, req.user as User);
  }
}
