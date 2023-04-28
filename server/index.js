const express = require('express')
const application = express()
const BackendClient = require("./classes/client.js")
const cors = require('cors');
application.use(cors())

var data = require( './config/config.json') 
let client = new BackendClient(
    data.dbConInfo.user, 
    data.dbConInfo.host, 
    data.dbConInfo.databse, 
    data.dbConInfo.password, 
    parseInt(data.dbConInfo.port))
client.client.connect()
var tableData = []

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
application.get("/create_table", (req, res) => {        
    const tableName = req.query.data
    client.CreateTable(tableName)
})

application.get("/read_table", (req, res) => {        
    const tableName = req.query.tableName
    client.GetTable(tableName)    
})

application.get("/get_table", (req, res) => {        
    tableData = client.data
    res.json(tableData)
})

application.get("/write_table", (req, res) => {
    const { tableName, newData } = req.query
    console.log(tableName, newData)
    client.WriteToTable(tableName, newData)
})

application.get("/remove_record", (req, res) => {
    const {tableName, value} = req.query
    client.DeleteFromTable(tableName, value)
})

application.get("/change_record", (req, res) => {
    const { tableName, newData } = req.query
    client.InsertToTable(tableName, newData)
})

application.get("/api", (req, res) => {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json({"hi": ["1", "2"]})
})

application.listen(5000, () => {console.log("Server started...")})