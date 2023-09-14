const mongoose = require('mongoose')
const {mongodb_conn_string} = require('../config/index')

const dbConnext = async () =>{
    try{
        const conn = await mongoose.connect(mongodb_conn_string)
        console.log(`database connected to host ${conn.connection.host}`)
    }catch(err){
        console.log(err)
    }
}

module.exports = dbConnext;