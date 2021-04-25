import Router from 'express'
import { getWeekNumber } from '../helper.js'
import * as activity from '../models/activity.js'

const router = Router()

router.get('/getAll', async (req, res) => {
    res.json(await activity.getAll())
})

router.get('/getAllByCountry', async (req, res) => {
    const country = req.query.country
    res.json(await activity.getByCountry(country))
})

router.get('/getDeathsAndCasesByDate', async (req, res) => {

    const country = req.query.country
    const startDate = getWeekNumber(req.query.start)
    const endDate = getWeekNumber(req.query.end)
    res.json(await activity.getDeathsAndCasesByDate(country, startDate, endDate))
})

export default router