import query from "../config/db.js"
import schema from '../schema.js'

const getAll = async () => {
    return await query('SELECT cases, deaths, tests FROM activity')
}

const getAllByCountry = async (res, countryCode) => {
    const result = await query('SELECT sum(cases) as cases, sum(deaths) as deaths, sum(tests) as tests \
                                FROM activity \
                                WHERE `code`= ?', [countryCode]);

    // validate results
    try {
        const value = await schema.validateAsync({ 
            cases: result[0]['cases'],
            deaths: result[0]['deaths'],
            tests: result[0]['tests']
        });
    }
    catch (err) { 
        res.status(404);
        return;
    }
    return result;
    
}

const getDeathsAndCasesByDate = async (res, countryCode, startDate, endDate) => {
    const result = await query('SELECT sum(cases) as cases, sum(deaths) as deaths\
                                FROM activity \
                                WHERE `code`=? AND year_week BETWEEN ? AND ?', [countryCode, startDate, endDate]);
    // validate results
    try {
        const value = await schema.validateAsync({ 
            cases: result[0]['cases'],
            deaths: result[0]['deaths'],
        });
    }
    catch (err) { 
        res.status(404);
        return;
    }
    return result;
}

export {
    getAll,
    getAllByCountry,
    getDeathsAndCasesByDate,
};

