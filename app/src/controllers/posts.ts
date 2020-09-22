import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { rolesGuards } from 'src/auth'
import {
  PostCategory,
  PostInterface,
  PostType,
} from 'src/models/interfaces/post'
import { UserRole } from 'src/models/interfaces/user'
import { PostDocument, PostODM, PostSchema } from 'src/models/odms/post'
import { UserDocument } from 'src/models/odms/user'
import { checkContract, Implication } from 'src/utils/contracts'

export const router = Router()

router.post('/', ...rolesGuards(), async (req, res) => {
  const body = req.body as PostInterface
  const user = req.user as UserDocument

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
})

router.get('/:id', async (req, res) => {
  const post = await PostODM.findById(req.params.id as string).exec()

  checkContract(post !== null, 'Not found')

  res.json(post)
})

router.put('/:id', ...rolesGuards(), async (req, res) => {
  const post = await PostODM.findById(req.params.id as string)
    .populate('author')
    .exec()
  const currentUser = req.user as UserDocument

  checkContract([
    [post !== null, 'Not found'],
    [post!.author?.id === currentUser.id, 'Forbidden'],
  ])

  const updated = await post?.update(req.body).exec()
  res.json(updated)
})

router.get('/', async (req, res) => {
  const query = req.query
  const filterObj: any = {
    ...(query.category && { category: parseInt(query.category as string, 10) }),
    ...(query.text && { $text: { $search: query.text } }),
    ...(query.range &&
      query.lat &&
      query.long && {
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [
                parseFloat(query.lat as string),
                parseFloat(query.long as string),
              ],
            },
            $maxDistance: parseInt(query.range as string, 10) * 1000,
          },
        },
      }),
  }

  // TODO : fuzzy search
  const posts = await PostODM.find(filterObj).exec()
  res.json(posts)
})
