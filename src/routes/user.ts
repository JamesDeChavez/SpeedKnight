import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  console.log('req.body', req.body)
  setTimeout(() => res.send(req.body), 1000)
})

router.post("/register", (req, res) => {
  console.log('req.body', req.body)
  setTimeout(() => res.send(req.body), 1000)
})

export default router
