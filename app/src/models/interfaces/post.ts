import { PointInterface } from './location'
import { UserInterface } from './user'

export interface PostInterface {
  type: PostType
  category: PostCategory
  title: string
  description?: string
  location: PointInterface
  author?: UserInterface
}

export enum PostType {
  OFFER,
  REQUEST,
}
export const PostTypes = [PostType.OFFER, PostType.REQUEST]

export enum PostCategory {
  FOOD,
}
export const PostCategories = [PostCategory.FOOD]
