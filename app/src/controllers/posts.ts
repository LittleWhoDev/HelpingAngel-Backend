import { Router } from 'express'
import { rolesGuards } from 'src/auth'
import {
  PostCreateDTO,
  PostCreateSchema,
  PostParamsDTO,
  PostParamsSchema,
  PostSearchDTO,
  PostSearchSchema,
  PostUpdateDTO,
  PostUpdateSchema,
} from 'src/models/dtos/post'
import validator from 'src/models/dtos/validator'
import { PostType } from 'src/models/interfaces/post'
import { UserRole } from 'src/models/interfaces/user'
import { PostODM } from 'src/models/odms/post'
import { checkContract, Implication } from 'src/utils/contracts'
import { ValidatedRequest } from 'express-joi-validation'

export const router = Router()

router.post(
  '/',
  ...rolesGuards(),
  validator.body(PostCreateSchema),
  async (req: ValidatedRequest<PostCreateDTO>, res) => {
    const body = req.body
    const user = req.user!

    checkContract([
      [
        new Implication(
          body.type === PostType.OFFER,
          [UserRole.ANGEL, UserRole.DONOR].includes(user.role)
        ),
        'You must be a donor',
      ],
      [
        new Implication(
          body.type === PostType.REQUEST,
          [UserRole.ANGEL, UserRole.REQUESTER].includes(user.role)
        ),
        'You must be a requester',
      ],
    ])

    const post = await PostODM.create({
      ...body,
      author: user.id,
    })
    res.json(post)
  }
)

router.get(
  '/:id',
  validator.params(PostParamsSchema),
  async (req: ValidatedRequest<PostParamsDTO>, res) => {
    const post = await PostODM.findById(req.params.id).exec()

    checkContract(post !== null, 'Not found')

    res.json(post)
  }
)

router.put(
  '/:id',
  ...rolesGuards(),
  validator.params(PostParamsSchema),
  validator.body(PostUpdateSchema),
  async (req: ValidatedRequest<PostUpdateDTO>, res) => {
    const post = await PostODM.findById(req.params.id).populate('author').exec()
    const currentUser = req.user!

    checkContract([
      [post !== null, 'Not found'],
      [post!.author?.id === currentUser.id, 'Forbidden'],
    ])

    const updated = await post?.update(req.body).exec()
    res.json(updated)
  }
)

router.get(
  '/',
  validator.query(PostSearchSchema),
  async (req: ValidatedRequest<PostSearchDTO>, res) => {
    const query = req.query

    const typeFilter = query.type && {
      type: query.type,
    }
    const categoryFilter = query.category !== undefined && {
      category: query.category,
    }
    const textFilter = query.text && {
      $text: {
        $search: query.text,
      },
    }
    // range variable is in KMs and we need it in Ms
    const rangeFilter =
      query.range && locationQuery(query.lat!, query.long!, query.range * 1000)

    const filterObj = {
      ...typeFilter,
      ...categoryFilter,
      ...textFilter,
      ...rangeFilter,
    }

    // TODO : fuzzy search
    const postsQuery = query.recent
      ? PostODM.find(filterObj).sort({ createdAt: -1 }).limit(query.recent)
      : PostODM.find(filterObj)
    res.json(await postsQuery.exec())
  }
)

function locationQuery(lat: number, long: number, range: number) {
  return {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lat, long],
        },
        $maxDistance: range,
      },
    },
  }
}
