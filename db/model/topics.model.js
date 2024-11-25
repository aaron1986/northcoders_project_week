const db = require("../../db/connection");

exports.selectTopics = async () => {
    let sqlQuery = `SELECT * FROM topics;`
    const values = [];
    return db.query(sqlQuery, values).then(({rows}) => {
        return rows
    })

} // end of selectTopics
    