import { Router } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";

const router = Router()
const apiRoutes = Router()

router.use('/api', apiRoutes)
    apiRoutes.use('/user', userRoutes)

router.use('/auth', authRoutes)



export default router;