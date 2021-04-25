import query from "../config/db.js"

const getByCases = async (cases, startDate, endDate) => {
    return await query('SELECT COUNTRY.* FROM country COUNTRY WHERE COUNTRY.code IN ' +
            '( SELECT ACTIVITY.code FROM activity ACTIVITY ' + 
            'WHERE year_week BETWEEN "' + startDate + '" AND "' + endDate + '" ' +  
            'GROUP BY ACTIVITY.code HAVING sum(ACTIVITY.cases) > ' + cases + ');'
    )
}

export {
    getByCases,
}
    