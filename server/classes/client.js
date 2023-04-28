const { Client } = require('pg')

class Plan {
    constructor(id, monthPayment, smsCost, callCost) {
        this.id = id
        this.monthPayment = monthPayment
        this.smsCost = smsCost
        this.callCost = callCost
    }
}

class City {
    constructor(code, name) {
        this.code = code
        this.name = name
    }
}

class Service {
    constructor(id, payment, description, moreCalls, moreSms) {
        this.id = id
        this.payment = payment
        this.description = description
        this.moreCalls = moreCalls
        this.moreSms = moreSms
    }
}

class Abonent {
    // <param name="planId">Айди тарифа на котором находится абонент </param>
    // <param name="startDate">Дата подключения тарифа абонентом </param>
    constructor(name, surname, lastName, phoneNumber, planId, startDate, birthDate) {
        this.name = name
        this.surname = surname
        this.lastName = lastName
        this.age = age
        this.phoneNumber = phoneNumber
        this.planId = planId
        this.startDate = startDate
        this.birthDate = birthDate
    }
}

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

        this.data = [{}]
    }

    CreateDatabse() {
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
            });                
        } 
        catch (error) {
            console.log(error.stack)
        }            
    }

    CreateTable(tableName) {
        try {
            switch(tableName)
            {
                case "Abonents": {
                    this.query = `
                    CREATE TABLE abonents (
                        id  SERIAL PRIMARY KEY,
                        name text,
                        surname text,
                        lastName text,
                        age INT,
                        cityName text,
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
                            name text NOT NULL 
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
                case "Services": {
                    this.query = `
                        CREATE TABLE services (
                            id SERIAL PRIMARY KEY,
                            payment INT,
                            description text,
                            moreCalls int,
                            moreSms int,
                        );`
                }
            }

            this.client.query(this.query, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Table is successfully created');
            });                
        } 
        catch (error) {
            console.log(error.stack)
        }
    }

    GetTable(tableName) {
        try {
            switch(tableName)
            {
                case "Abonents": {
                    this.query = `
                        SELECT * from abonents`
                    break
                }
                case "Citys": {
                    this.query = `
                        SELECT * from citys`
                    break
                }
                case "Plans": {
                    this.query = `
                        SELECT * from plans`
                    break
                }
                case "Services": {
                    this.query = `
                        SELECT * from services`
                    break
                }
            }

            this.client.query(this.query, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Table is successfully imported');
                console.log("\n * ", res.rows)
                this.data = res.rows
            });            
        } 
        catch (error) {
            console.log(error.stack)
        }        
    }

    WriteToTable(tableName, fieldsArray) {
        try {
            var fields = fieldsArray.split(",")
            switch(tableName) 
            {
                case "Abonents": {
                    this.query = `
                    insert into abonents(name, surname, lastName, age, cityName, phoneNumber, planId, startDate, birthDate)
                    values('Данил', 'Данилов', 'Данилович', '39', 'Ахтубинск', '+79171846391', '2', '2023-11-27', '1984-03-05')`
                    break
                }
                case "Citys": {
                    var city = new City(fields[0], fields[1])
                    this.query = `
                        insert into citys (code, name)
                        values ('${city.code}', '${city.name}')`
                    console.log("\n query: ", this.query)
                    break
                }
                case "Plans": {
                    
                    console.log("\n 1 ", fieldsArray, "\n 2 ", fields)
                    var plan = new Plan(fields[0], fields[1], fields[2], fields[3])
                    this.query = `
                        insert into plans (id, monthPayment, smsCost, callCost)
                        values ('${plan.id}','${plan.monthPayment}', '${plan.smsCost}', '${plan.callCost}')`
                    console.log("\n query: ", this.query)
                    break
                }
                case "Services": {
                    var service = new Service(undefined, fields[1], fields[2], fields[3], fields[4])
                    this.query = `
                        insert into services (payment, description, morecalls, moresms)
                        values ('${service.payment}', '${service.description}', '${service.moreCalls}', '${service.moreSms}')`
                    console.log("\n query: ", this.query)
                    break                    
                }
            }

            this.client.query(this.query, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Table is successfully changed');
                console.log("\n * ", res.rows)
                this.data = res.rows
            });   
        } catch (err) {
            console.log(err)
        }
    }

    DeleteFromTable(tableName, value) {
        try {
            switch(tableName) {
                case "Abonents" : {
                    this.query = `
                        DELETE FROM ${tableName}
                        WHERE name = ${value.toString()}`
                    break
                }
                case "Citys" : {
                    this.query = `
                        DELETE FROM ${tableName}
                        WHERE code = ${value.toString()}`
                    break
                }
                case "Plans" : {
                    this.query = `
                        DELETE FROM ${tableName}
                        WHERE id = ${value.toString()}`
                    break
                }
                case "Services" : {
                    this.query = `
                        DELETE FROM ${tableName}
                        WHERE id = ${value.toString()}`
                    break
                }
            }
            this.client.query(this.query, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Table is successfully changed');
                console.log("\n * ", res.rows)
                this.data = res.rows
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    InsertToTable(tableName, fieldsArray) {
        try {
            var fields = fieldsArray.split(",")
            switch(tableName) 
            {
                case "Abonents": {
                    this.query = `
                    insert into abonents(name, surname, lastName, age, cityName, phoneNumber, planId, startDate, birthDate)
                    values('Данил', 'Данилов', 'Данилович', '39', 'Ахтубинск', '+79171846391', '2', '2023-11-27', '1984-03-05')`
                    break
                }
                case "Citys": {
                    var city = new City(fields[0], fields[1])
                    this.query = `
                        update citys 
                        set code = '${city.code}'
                        where name = '${city.name}'`
                    console.log("\n query: ", this.query)
                    break
                }
                case "Plans": {
                    
                    console.log("\n 1 ", fieldsArray, "\n 2 ", fields)
                    var plan = new Plan(undefined, fields[1], fields[2], fields[3])
                    this.query = `
                        update plans 
                        set smscost = '${plan.smsCost}', callcost =  '${plan.callCost}'
                        where monthpayment = '${plan.monthPayment}'`
                    console.log("\n query: ", this.query)
                    break
                }
                case "Services": {
                    var service = new Service(undefined, fields[1], fields[2], fields[3], fields[4])
                    this.query = `
                        update plans
                        set description = '${service.description}', 
                        morecalls = '${service.moreCalls}',
                        moresms = '${service.moreSms}'
                        where payment = '${service.payment}'`
                    console.log("\n query: ", this.query)
                    break                    
                }
            }

            this.client.query(this.query, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Table is successfully changed');
                console.log("\n * ", res.rows)
                this.data = res.rows
            });   
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = BackendClient

