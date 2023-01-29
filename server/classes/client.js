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

    CreateDatabse() {
        this.client.connect()
        try{
            this.query = `
                CREATE DATABASE communication
                    WITH
                    OWNER = postgres
                    ENCODING = 'UTF8'
                    LC_COLLATE = 'C'
                    LC_CTYPE = 'C'
                    TABLESPACE = pg_default
                    CONNECTION LIMIT = -1
                    IS_TEMPLATE = False;`

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

    CreateTable(tableName) {
        this.client.connect()
        try {
            switch(tableName)
            {
                case "Abonents": {
                    this.query = `
                        CREATE TABLE abonents (
                            name varchar,
                            surname varchar,
                            lastName varchar,
                            age INT,
                            phoneNumber BIGINT,
                            planId REFERENCES plans (id),
                            startDate DATE,
                            birthDate DATE
                        );`
                    break
                }
                case "Citys": {
                    this.query = `
                        CREATE TABLE citys (
                            code INT PRIMARY KEY,
                            name varchar NOT NULL 
                        );`
                    break
                }
                case "Plans": {
                    this.query = `
                        CREATE TABLE plans (
                            id  SERIAL PRIMARY KEY,
                            monthPayment INT,
                            smsCost INT,
                            callCost INT
                        );`
                    break
                }
            }

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

