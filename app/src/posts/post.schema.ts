import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum PostCategory {
  FOOD,
}

export enum PostType {
  REQUEST,
  OFFER,
}

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: PostType;

  @Prop({ required: true })
  category: PostCategory;

  // TODO: add relation
  @Prop()
  author;
}

export const PostSchema = SchemaFactory.createForClass(Post);
