const path = require('path')

const migrationsDirectory = path.join(__dirname, '../migrations')
const seedsBaseDirectory = path.join(__dirname, '../seeds')

const maxPoolSize = parseInt(process.env.MAX_POOL_SIZE, 10)

module.exports = {
    local: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'tiadevelopment',
            password: 'MpyS+^M_KPq7cdbC',
            database: 'tia'
        },
        pool: { min: 0, max: maxPoolSize },
        connection_string: 'postgres://tiadevelopment:MpyS+^M_KPq7cdbC@127.0.0.1:5432/tia',
        migrations: {
            directory: migrationsDirectory
        },
        seeds: {
            directory: path.join(seedsBaseDirectory, 'local')
        }
    },
    test: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'foo',
            password: 'bar',
            database: 'foobar'
        },
        connection_string: 'postgres://garage:code@home:5432/foobar'
    },
    fargate: {
        client: process.env.PG_CLIENT,
        connection_string: `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`,
        connection: {
            host: process.env.PG_HOST,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            port: process.env.PG_PORT
        },
        pool: { min: 0, max: maxPoolSize },
        migrations: {
            directory: path.join(__dirname, '../migrations')
        },
        seeds: {
            directory: path.join(__dirname, '../seeds')
        }
    }
}
