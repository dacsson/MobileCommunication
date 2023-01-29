const express = require('express')
const application = express()
const BackendClient = require("./classes/client.js")
const cors = require('cors');
application.use(cors())

// - Создание базы данных
application.post("/create_db", (req, res) => {
    try {
        client.CreateDatabse()
    }
    catch(err) {
        console.log(err)
    }
})

// - Создание таблицы в бд по имени таблицы
application.post("/create_table", (req, res) => {
    var data = require( './config/config.json') 
    
    let client = new BackendClient(
        data.dbConInfo.user, 
        data.dbConInfo.host, 
        data.dbConInfo.databse, 
        data.dbConInfo.password, 
        parseInt(data.dbConInfo.port))

    const tableName = req.query
    client.CreateDatabse(tableName)
})

application.get("/api", (req, res) => {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json({"hi": ["1", "2"]})
})

application.listen(5000, () => {console.log("Server started...")})