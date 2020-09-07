import { Router } from 'express'
import { rolesGuards } from 'src/auth'
import { UserRole } from 'src/models/interfaces/user'
import { UserDocument, UserODM } from 'src/models/odms/user'
import { checkContract } from 'src/utils/contracts'

export const router = Router()

router.get('/me', ...rolesGuards(), async (req, res) => {
  res.json(req.user)
})

router.put('/me', ...rolesGuards(), async (req, res) => {
  const updated = await (req.user as UserDocument).update(req.body).exec()
  res.json(updated)
})

router.get('/:id', async (req, res) => {
  const user = await UserODM.findById(req.params.id).exec()

  checkContract(user !== null, 'User not found')

  res.json(user)
})

router.put('/:id', ...rolesGuards(), async (req, res) => {
  const currentUser = req.user as UserDocument
  const user = await UserODM.findById(req.params.id as string).exec()

  checkContract([
    [user !== null, 'User not found'],
    [user!.id === currentUser.id || user!.role === UserRole.ANGEL, 'Forbidden'],
  ])

  const updated = await user?.update(req.body).exec()
  res.json(updated)
})
