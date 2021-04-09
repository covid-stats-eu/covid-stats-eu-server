import query from "../config/db.js"

const getAll = async () => {
    return await query('SELECT cases, deaths, tests FROM activity')
}

const getByCountry = async (countryCode) => {
    const result = await query('SELECT sum(cases) as cases, sum(deaths) as deaths, sum(tests) as tests FROM activity WHERE `code`= ?', [countryCode])

    if (result[0]['cases'] != null && result[0]['deaths'] != null && result[0]['tests'] != null) {
        return result
    } else {
        return "This country doesnt exist"
    }
}

export {
    getAll,
    getByCountry,
};