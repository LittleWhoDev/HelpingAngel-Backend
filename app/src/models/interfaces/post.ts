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

export enum PostCategory {
  FOOD,
}
