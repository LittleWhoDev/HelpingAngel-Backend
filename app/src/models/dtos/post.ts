import * as Joi from '@hapi/joi'
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation'
import {
  PostCategories,
  PostCategory,
  PostInterface,
  PostType,
  PostTypes,
} from '../interfaces/post'

export const LocationSchema = Joi.object({
  type: Joi.string().valid('Point').required(),
  coordinates: Joi.array().items(Joi.number()).required(),
})

export const PostCreateSchema = Joi.object({
  type: Joi.number()
    .integer()
    .valid(...PostTypes)
    .required(),
  category: Joi.number()
    .integer()
    .valid(...PostCategories)
    .required(),
  title: Joi.string().required(),
  description: Joi.string().optional(),
  address: Joi.string().required(),
  location: LocationSchema,
})

export const PostUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  location: LocationSchema.optional(),
})

export const PostParamsSchema = Joi.object({
  id: Joi.string().required(),
})

export const PostSearchSchema = Joi.object({
  type: Joi.number()
    .integer()
    .valid(...PostTypes)
    .optional(),
  category: Joi.number()
    .integer()
    .valid(...PostCategories)
    .optional(),
  range: Joi.number().optional(),
  lat: Joi.number().when('range', {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  long: Joi.number().when('range', {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  text: Joi.string().optional(),
  recent: Joi.number().integer().optional(),
})

export interface PostSearchDTO extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    type?: PostType
    category?: PostCategory
    range?: number
    lat?: number
    long?: number
    text?: string
    recent?: number
  }
}

export interface PostParamsDTO extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string
  }
}

export interface PostCreateDTO extends ValidatedRequestSchema {
  [ContainerTypes.Body]: PostInterface
}

export interface PostUpdateDTO extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string
  }
  [ContainerTypes.Body]: Partial<PostInterface>
}
