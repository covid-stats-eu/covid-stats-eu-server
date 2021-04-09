import Router from 'express'
import * as activity from '../models/activity.js'

const router = Router()

router.get('/getAll', async (req, res) => {
    res.json(await activity.getAll())
})

router.get('/getByCountry/:countryCode', async (req, res) => {
    res.json(await activity.getByCountry(req.params.countryCode))
})

export default router