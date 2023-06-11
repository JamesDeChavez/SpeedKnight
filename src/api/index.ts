import { Router } from "express";
import userRoutes from "./user";

const router = Router()
const apiRoutes = Router()

router.use('/api', apiRoutes)

apiRoutes.use('/user', userRoutes)



export default router;