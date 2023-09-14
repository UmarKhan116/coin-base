const env = require('dotenv').config();

const port = process.env.PORT;
const mongodb_conn_string = process.env.MONGODB_CONNECTION_STRING;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH;

module.exports ={
    port,
    mongodb_conn_string,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    BACKEND_SERVER_PATH,
}