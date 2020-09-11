import { Router } from 'express'
import { router as authRouter } from './auth'
import { router as usersRouter } from './users'
import { router as postsRouter } from './posts'

// Init router and path
const router = Router()
router.use('/', authRouter)
router.use('/', usersRouter)
router.use('/', postsRouter)

// Export the base-router
export default router
