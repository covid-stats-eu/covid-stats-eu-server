import Router from 'express'
import { getWeekNumber } from '../helper.js'
import * as country from '../models/country.js'


const router = Router()

// Format example: http://localhost:3000/country/getByCases?cases=100000&start=2021-1-5&end=2021-2-5
router.get('/getByCases', async (req, res) => {

    const cases = req.query.cases
    const startDate = getWeekNumber(req.query.start)
    const endDate = getWeekNumber(req.query.end)
    res.json(await country.getByCases(cases, startDate, endDate))
})

export default router