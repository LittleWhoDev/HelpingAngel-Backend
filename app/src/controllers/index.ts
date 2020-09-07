import { Router } from 'express'
import { router as authRouter } from './auth'

// Init router and path
const router = Router()
router.use('/auth', authRouter)

// Export the base-router
export default router
