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
    // convert dates to year-week number 
    startDate = getWeekNumber(startDate);
    endDate = getWeekNumber(endDate);
    res.json(await activity.getDeathsAndCasesByDate(res, country, startDate, endDate));
})

router.get('/getNumberOfTopTenWeek', async (req, res) => {
    res.json(await activity.getNumberOfTopTenWeek());
})

router.get('/getCountryPairs', async (req, res) => {
    let startDate = req.query.start
    let endDate = req.query.end
    // validate user's input
    try {
        if (!startDate) {
            throw new Error(`"startDate" is required`)
        }
        if (!endDate) {
            throw new Error(`"endDate" is required`)
        }
        const value = await schema.validateAsync({ 
            startDate: startDate,
            endDate: endDate
        });
    } catch (err) { 
        res.status(400).send(err.message);
        return;
    }
    // convert dates to year-week number 
    startDate = getWeekNumber(startDate);
    endDate = getWeekNumber(endDate);

    res.json(await activity.getCountryPairs(startDate, endDate));

})

router.post('/addData', async (req, res) => {
    const country = req.body.country
    let date_of_week = req.body.date
    const cases = req.body.cases
    const deaths = req.body.deaths
    const tests = req.body.tests
    // validate user's input
    try {
        if (isNaN(cases)) {
            throw new Error(`"cases" is required`)
        }
        if (isNaN(deaths)) {
            throw new Error(`"deaths" is required`)
        }
        if (isNaN(tests)) {
            throw new Error(`"tests" is required`)
        }
        if (!date_of_week) {
            throw new Error(`"date" is required`)
        }
        if (!country) {
            throw new Error(`"country" is required`)
        }
        const value = await schema.validateAsync({ 
            country: country,
            startDate: date_of_week,
            cases: cases,
            deaths, deaths,
            tests: tests
        });
    } catch (err) { 
        res.status(400).send(err.message);
        return;
    }
    // convert dates to year-week number 
    const number_of_week = getWeekNumber(date_of_week);

    res.json(await activity.addData(res, cases, deaths, tests, number_of_week, country));
})


export default router