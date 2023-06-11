import { Router } from "express";

const router = Router();

router.route("/login").post((req, res) => {
  console.log('req.body', req.body)
  setTimeout(() => res.send(req.body), 1000)
})

router.route("/register").post((req, res) => {
  console.log('req.body', req.body)
  setTimeout(() => res.send(req.body), 1000)
})

export default router
