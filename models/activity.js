import query from "../config/db.js"

const getAll = async () => {
    return await query('SELECT cases, deaths, tests FROM activity')
}

const getAllByCountry = async (countryCode) => {
    
    return await query('SELECT sum(cases) as cases, sum(deaths) as deaths, sum(tests) as tests \
                        FROM activity \
                        WHERE `code`= ?', [countryCode])
}

const getDeathsAndCasesByDate = async (countryCode, startDate, endDate) => {
    
    return await query('SELECT sum(cases) as cases, sum(deaths) as deaths\
                        FROM activity \
                        WHERE `code`=? AND year_week BETWEEN ? AND ?', [countryCode, startDate, endDate])
}

export {
    getAll,
    getAllByCountry,
    getDeathsAndCasesByDate,
};