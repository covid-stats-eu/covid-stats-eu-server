import query from "../config/db.js"

const getByCases = async (cases, startDate, endDate) => {
    return await query('SELECT COUNTRY.* \
                        FROM country COUNTRY \
                        WHERE COUNTRY.code IN (\
                            SELECT ACTIVITY.code \
                            FROM activity ACTIVITY \
                            WHERE year_week BETWEEN ? AND ? \
                            GROUP BY ACTIVITY.code \
                            HAVING sum(ACTIVITY.cases) > ?);', [startDate, endDate, cases])
}

const getTop10Weeks = async () => {
    return await query('SELECT activity.code, activity.year_week, max((activity.tests/country.population)*100) AS percent \
                        FROM activity \
                        INNER JOIN country ON activity.code=country.code \
                        GROUP BY activity.code \
                        ORDER BY percent DESC \
                        LIMIT 10;')
}

export {
    getByCases,
    getTop10Weeks,
}