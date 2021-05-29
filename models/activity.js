import query from "../config/db.js"
import schema from '../schema.js'

const getAll = async () => {
    return await query('SELECT cases, deaths, tests FROM activity')
}

// QA
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

// QB
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

// QE
const getNumberOfTopTenWeek = async () => {
    return await query('SELECT DISTINCT ACTIVITY.code, count(*) over ( partition BY ACTIVITY.code ) as numberOfWeeks \
                        FROM activity ACTIVITY \
                        LEFT JOIN activity ACTIVITY_B \
                        ON ACTIVITY.year_week = ACTIVITY_B.year_week and ACTIVITY.cases <= ACTIVITY_B.cases \
                        GROUP BY ACTIVITY.code, ACTIVITY.year_week, ACTIVITY.cases \
                        HAVING count(*) <= 10 \
                        ORDER BY ACTIVITY.year_week ASC, ACTIVITY.cases');
}

// QF
const getCountryPairs = async (startDate, endDate) => {
    return await query(        
        'select ' +
        'tb_1.code as A_code, tb_1.cases as A_cases, tb_1.deaths as A_deaths, ' + 
        'tb_2.code as B_code, tb_2.cases as B_cases, tb_2.deaths as B_deaths from ' +
        '(select sum(cases) as cases, sum(deaths) as deaths, code from activity ' + 
        'WHERE year_week BETWEEN "' + startDate + '" AND "' + endDate + '" group by code) as tb_1 ' +
        'JOIN ' + 
        '(select sum(cases) as cases, sum(deaths) as deaths, code from activity ' +
        'WHERE year_week BETWEEN "' + startDate + '" AND "' + endDate + '" group by code) as tb_2 ' +
        'ON (ABS(tb_1.cases - tb_2.cases) / ((tb_1.cases + tb_2.cases) / 2) <= 0.1 ' +
        'OR ABS(tb_1.deaths - tb_2.deaths) / ((tb_1.deaths + tb_2.deaths) / 2) <= 0.1) AND tb_1.code <> tb_2.code ' +
        'GROUP BY LEAST(tb_1.code, tb_2.code), GREATEST(tb_1.code, tb_2.code);'
    );
}

export {
    getAll,
    getAllByCountry, 
    getDeathsAndCasesByDate,
    getNumberOfTopTenWeek,
    getCountryPairs,
};

