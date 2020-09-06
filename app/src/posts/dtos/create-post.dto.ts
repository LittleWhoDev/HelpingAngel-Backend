import { PostCategory, PostType } from '../post.schema';

export class CreatePostDto {
  title: string;
  description?: string;
  type: PostType;
  category: PostCategory;
}
