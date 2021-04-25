import Router from 'express'
import { getWeekNumber } from '../helper.js'
import * as country from '../models/country.js'
import schema from '../schema.js'


const router = Router()

// Format example: http://localhost:3000/country/getByCases?cases=100000&start=2021-1-5&end=2021-2-5
router.get('/getByCases', async (req, res) => {
    const cases = req.query.cases;
    let startDate = req.query.start;
    let endDate = req.query.end;
    // validate user's input
    try {
        const value = await schema.validateAsync({ 
            cases: cases,
            startDate: startDate,
            endDate: endDate
        });
    }
    catch (err) { 
        res.status(400).send(err.message);
        return;
    }
    startDate = getWeekNumber(startDate)
    endDate = getWeekNumber(endDate)
    res.json(await country.getByCases(res, cases, startDate, endDate))
})

export default router