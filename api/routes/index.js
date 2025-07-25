const {Router} = require('express')
const authRoutes = require('./auth.routes')
const profileRoutes = require('./profile.routes')
const cmsRoutes = require('./cms')
const { auth, cmsUser } = require('@/library/middlewares')
const frontRoutes = require('./front')


const router = Router()

router.use('/auth', authRoutes)

router.use('/profile', auth, profileRoutes)

router.use('/cms', auth, cmsUser, cmsRoutes)

router.use(frontRoutes)

router.use((req,res,next) => {
    next({
        message:'Resource not found',
        status:404,
    })


}) 



module.exports = router