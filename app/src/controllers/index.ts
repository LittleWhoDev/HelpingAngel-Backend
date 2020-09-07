import { Router } from 'express'
import { router as authRouter } from './auth'
import { router as usersRouter } from './users'
import { router as postsRouter } from './posts'

// Init router and path
const router = Router()
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/posts', postsRouter)

// Export the base-router
export default router
