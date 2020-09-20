import { Document, model, Schema } from 'mongoose'
import { PostCategory, PostInterface, PostType } from '../interfaces/post'
import { UserDocument } from './user'

export interface PostDocument extends PostInterface, Document {
  author?: UserDocument
}
export const PostSchema = new Schema({
  type: {
    type: PostType,
    required: true,
  },
  category: {
    type: PostCategory,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  location: {
    type: { type: String },
    coordinates: [],
  },
})
// Support for GeoJSON object
PostSchema.index({ location: '2dsphere' })
export const PostODM = model<PostDocument>('Post', PostSchema)
