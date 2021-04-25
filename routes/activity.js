import Router from 'express'
import { getWeekNumber } from '../helper.js'
import * as activity from '../models/activity.js'
import schema from '../schema.js'

const router = Router()

router.get('/getAllByCountry', async (req, res) => {
    const country = req.query.country
    // validate user's input
    try {
        const value = await schema.validateAsync({ country: country });
    }
    catch (err) { 
        res.status(400).send(err.message);
        return;
    }
    res.json(await activity.getAllByCountry(res, country))
})

router.get('/getDeathsAndCasesByDate', async (req, res) => {
    const country = req.query.country;
    let startDate = req.query.start
    let endDate = req.query.end
    // validate user's input
    try {
        const value = await schema.validateAsync({ 
            country: country,
            startDate: startDate,
            endDate: endDate
        });
    } catch (err) { 
        res.status(400).send(err.message);
        return;
    }
    startDate = getWeekNumber(startDate);
    endDate = getWeekNumber(endDate);
    res.json(await activity.getDeathsAndCasesByDate(res, country, startDate, endDate));
})


export default router