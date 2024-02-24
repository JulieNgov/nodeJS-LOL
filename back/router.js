import express from 'express'
import ChampionsRoutes from './routes/ChampionsRoutes.js'
import AuthRoutes from './routes/AuthRoutes.js'
import UserRoutes from './routes/UserRoutes.js'

const router = express.Router()

router.use('/champions', ChampionsRoutes)
router.use('/auth', AuthRoutes)
router.use('/user', UserRoutes)

export default router