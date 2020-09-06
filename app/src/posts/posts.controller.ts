import { Controller, Get } from '@nestjs/common';
import { Post } from './post.schema';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }
}
