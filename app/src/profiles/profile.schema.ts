import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Profile {
  @Prop()
  name: string;

  @Prop()
  headline: string;

  @Prop()
  description: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
