import Router from 'express'
import { getWeekNumber } from '../helper.js'
import * as country from '../models/country.js'


const router = Router()

router.get('/getByCases/:cases/datePeriod/:startDate/:endDate', async (req, res) => {
    let startDate = getWeekNumber(req.params.startDate);
    let endDate = getWeekNumber(req.params.endDate);
    res.json(await country.getByCases(req.params.cases, startDate, endDate))
})

export default router