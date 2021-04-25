import query from "../config/db.js"

const getByCases = async (res, cases, startDate, endDate) => {
    const result = await query('SELECT COUNTRY.* FROM country COUNTRY WHERE COUNTRY.code IN ' +
            '( SELECT ACTIVITY.code FROM activity ACTIVITY ' + 
            'WHERE year_week BETWEEN "' + startDate + '" AND "' + endDate + '" ' +  
            'GROUP BY ACTIVITY.code HAVING sum(ACTIVITY.cases) > ' + cases + ');'
    )
    // validate results
    if (result.length == 0) {
        res.status(404);
        return;
    }

    return result;
}

export {
    getByCases,
}
    