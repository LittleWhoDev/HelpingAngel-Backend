import { Router } from 'express'
import { JwtPayload, signPayload } from 'src/auth/jwt'
import { LoginDTO, RegisterDTO } from 'src/models/dtos/auth'
import { UserODM } from 'src/models/odms/user'

export const router = Router()

router.post('/register', async (req, res) => {
  const body = req.body as RegisterDTO
  const user = await UserODM.create(body)
  res.json(user)
})

router.post('/login', async (req, res) => {
  const body = req.body as LoginDTO
  const user = await UserODM.findByIdentifier(body.username)
  if (!user || !(await user.isValidPassword(body.password)))
    throw Error('Invalid creds')

  res.json({
    token: signPayload({
      id: user.id,
      username: user.username,
    } as JwtPayload),
  })
})
