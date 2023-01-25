const { Client } = require('pg')

class BackendClient {
    constructor(user, host, database, password, port){
        this.client = new Client({
            user: user,
            host: host,
            database: database,
            password: password,
            port: port,
        })

        this.query = ''
    }

    CreateTables() {
        this.client.connect()
        try {
            this.query = `
                CREATE TABLE users (
                    email varchar,
                    firstName varchar,
                    lastName varchar,
                    age int
                );`

            this.client.query(this.query, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Table is successfully created');
                this.client.end();
            });                
        } 
        catch (error) {
            console.log(error.stack)
        }
    }
}

module.exports = BackendClient

