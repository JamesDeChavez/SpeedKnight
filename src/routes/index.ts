import { Router } from "express"
import userRoutes from "./user"
import scoreRoutes from "./score"
import authRoutes from "./auth"

const router = Router()
const apiRoutes = Router()

router.use('/api', apiRoutes)
    apiRoutes.use('/user', userRoutes)
    apiRoutes.use('/score', scoreRoutes)

router.use('/auth', authRoutes)



export default router;