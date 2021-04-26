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


const getNumberOfTopTenWeek = async () => {
    return await query('SELECT DISTINCT ACTIVITY.code, count(*) over ( partition BY ACTIVITY.code ) as numberOfWeeks \
                        FROM activity ACTIVITY \
                        LEFT JOIN activity ACTIVITY_B \
                        ON ACTIVITY.year_week = ACTIVITY_B.year_week and ACTIVITY.cases <= ACTIVITY_B.cases \
                        GROUP BY ACTIVITY.code, ACTIVITY.year_week, ACTIVITY.cases \
                        HAVING count(*) <= 10 \
                        ORDER BY ACTIVITY.year_week ASC, ACTIVITY.cases');
}

export {
    getAll,
    getAllByCountry, 
    getDeathsAndCasesByDate,
    getNumberOfTopTenWeek,
};

