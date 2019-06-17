const pgp = require('pg-promise') ({
    query: e => {
        console.log('QUERY:', e.query);
    }
})

const options = {
    host: 'localhost',
    database: 'votefastapp',
    user: 'tedgey'
}

const db = pgp(options);

module.exports = db;