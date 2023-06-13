import { Router } from "express";
import passport from "passport"

const router = Router();

router.get(
    "/twitter", 
    passport.authenticate('twitter', {
        scope: ['tweet.read', 'users.read', 'offline.access'],
    })
)

router.get(
    "/twitter/callback", 
    passport.authenticate('twitter'),
    (req: any, res: any) => {
        const userData = JSON.stringify(req.user, undefined, 2)
        console.log('session', req.session)
        res.redirect('https://localhost:5173/')
    }
)

router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook'),
    (req: any, res: any) => {
        const userData = JSON.stringify(req.user, undefined, 2)
        console.log('session', req.session)
        res.redirect('https://localhost:5173/')
    }
)

export default router
