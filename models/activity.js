import query from "../config/db.js"

const getAll = async () => {
    return await query('SELECT cases, deaths, tests FROM activity')
}

export default getAll