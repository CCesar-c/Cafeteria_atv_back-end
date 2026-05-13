import pg from 'pg'

const configuracao = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Cafeteria',
    password: 'senai',
    port: 5433
})

export default configuracao;