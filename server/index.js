const BackendClient = require("./classes/client.js")

let client = new BackendClient('postgres', 'localhost', 'communication', '1212', 5432)
client.CreateTables()