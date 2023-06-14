import { Router } from "express"

const router = Router()

const tempGlobalStats = {
  global: {
    best: 45,
    average: 25
}}

const tempUserScores = [33, 31, 45,31, 34]

router.get("/global", (req, res) => {
  setTimeout(() => res.send(tempGlobalStats), 1000)
})

router.post('/user', (req, res) => {
  console.log('req.body', req.body)
  setTimeout(() => res.send(tempUserScores), 1000)
})

export default router
