import { Router } from "express"

const router = Router()

router.post("/login", (req, res) => {
  setTimeout(() => res.send(req.body), 1000)
})

router.post("/register", (req, res) => {
  setTimeout(() => res.send(req.body), 1000)
})

export default router
