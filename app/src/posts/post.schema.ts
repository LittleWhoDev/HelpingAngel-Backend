import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum PostCategory {
  FOOD,
}

export enum PostType {
  REQUEST,
  OFFER,
}

export enum PostStatus {
  APPROVED,
  UNAPPROVED,
  VERIFIED,
}

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  type: PostType;

  @Prop({ required: true })
  category: PostCategory;

  @Prop({ required: true })
  status: PostStatus;

  @Prop(
    raw({
      type: MongooseSchema.Types.ObjectId,
      ref: 'User',
    }),
  )
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
