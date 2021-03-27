import Router from 'express'
import getAll from '../models/activity.js'

const router = Router()

router.get('/getAll', async (req, res) => {
    res.json(await getAll())
})

export default router