import query from "../config/db.js"

const getAll = async () => {
    return await query('SELECT cases, deaths, tests FROM activity')
}

const getByCountry = async (countryCode) => {
    return await query('SELECT sum(cases), sum(deaths), sum(tests) FROM activity WHERE code="' + countryCode + '";')
}

export {
    getAll,
    getByCountry,
};