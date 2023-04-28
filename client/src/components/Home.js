import '../App.css'
import {useEffect, useState} from 'react'

const Home = () => {

    const [backendData, setBackendData] = useState([{}])
    const [newData, setNewData] = useState([])
    const [tableName, setTableName] = useState()

    // `/create_database?data=${tableName}`
    const PostCreateTable = (tableName) => {
        try{
            fetch(`/create_table?tableName=${tableName}`).then(
                responce => {
                    responce.json()
                    console.log(responce)
                }
            )
        }
        catch(err) {
            console.log(err)
        }
    }

    const ReadDataFromTable = (tableName) => {
        try {
            fetch(`/read_table?tableName=${tableName}`).then(
                responce => responce.json()
            )
            setTableName(tableName)
        }
        catch(err) {
            console.log(err)
        }         
    }

    const GetDataFromTable = (tableName) => {
        try {
            fetch(`/get_table`).then(
                responce => responce.json()
            ).then(
                data => setBackendData(data)
            )
        }
        catch(err) {
            console.log(err)
        }
    }

    const WriteDataToTable = () => {
        var list = [...newData]
        var arrayStr = list[0].toString()

        console.log('\n list: ', list)
        
        for(let i = 1; i < list.length; i++) {
            arrayStr += ',' + list[i].toString()
        }
        console.log('\narraySTR: ', arrayStr)
        try {
            fetch(`/write_table?tableName=${tableName}&newData=${arrayStr}`).then(
                responce => responce.json()
                )
            } 
        catch(err) {
                console.log(err)
        }
            for(var i = 0; i < list.length; i++) {
                list.pop()
            }
    
            setNewData(list)
    }

    const DeleteFromTable = () => {
        var list = [...newData]
        var value = list[0].toString()
        console.log('\ndelete : ', `/remove_record?tableName=${tableName}&value=${value}`)
        try {
            fetch(`/remove_record?tableName=${tableName}&value=${value}`).then(
                responce => {
                    console.log(responce.json())
                }
            )
        }
        catch(err) {
            console.log(err)
        }
    }

    const ChangeRecordInTable = () => {
        var list = [...newData]
        var arrayStr = list[0].toString()

        console.log('\n list: ', list)
        
        for(let i = 1; i < list.length; i++) {
            arrayStr += ',' + list[i].toString()
        }
        try {
            fetch(`/change_record?tableName=${tableName}&newData=${arrayStr}`).then(
                responce => responce.json()
                )
            } 
        catch(err) {
                console.log(err)
        }
            for(var i = 0; i < list.length; i++) {
                list.pop()
            }
    
            setNewData(list)
    }

    const AddNewValues = (value, id) => {
        var list = [...newData]
        list[id] = value
        console.log('\nnewList: ', list, '\nid: ', id, '\nvalue: ', value)
        setNewData(list)
    }

    return(
        <div className='container'>
            <div class='sidebar'>
                <div class='menu'>
                    <button onMouseOver={() => ReadDataFromTable("Abonents")} onClick={() => GetDataFromTable("Abonents")}>Абоненты</button>
                    <button onMouseOver={() => ReadDataFromTable("Plans")} onClick={() => GetDataFromTable("Plans")}>Тарифы</button>
                    <button onMouseOver={() => ReadDataFromTable("Citys")}onClick={() => GetDataFromTable("Citys")}>Города</button>
                    <button onMouseOver={() => ReadDataFromTable("Services")}onClick={() => GetDataFromTable("Services")}>Услуги</button>
                </div>
            </div>

            <div class='main'>
                <div class='hugeCard'>
                    <div style={{display: 'flex', alignSelf: 'center', justifyContent: 'center'}}>
                        <table>
                            <thead>
                                {Object.keys(backendData[0]).map((obj, index) => (
                                    <tr key={index} style={{display: 'inline-block'}}>
                                        <th class='cell'>{JSON.stringify(obj)}</th>
                                    </tr>
                                ))}
                            </thead>
                            {backendData.map((el, it) => (
                                <tbody key={it}>
                                    {Object.values(backendData[it]).map((obj, index) => (
                                        <tr key={index} style={{display: 'inline-block'}} onMouseOver = {() => (console.log('1212'))}>
                                            <td class='cell'>
                                                <input type="text" placeholder={JSON.stringify(obj)}></input>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ))}
                        </table>                     
                    </div>
                    <div style={{display: 'flex', alignSelf: 'center', justifyContent: 'center'}}>
                        <table>
                                <tbody>
                                    {Object.values(backendData[0]).map((obj, index) => (
                                        <tr key={index} style={{display: 'inline-block'}} onMouseOver = {() => (console.log('1212'))}>
                                            <td class='cell'>
                                                <input type="text" id={index} style={{border: '1px solid black'}} onChange={(e) => AddNewValues(e.target.value, e.target.id) }></input>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                        </table>
                    </div>  
                    <button onClick={() => WriteDataToTable()}>Добавить</button>
                    <button onClick={() => DeleteFromTable()}>Удалить</button>
                    <button onClick={() => ChangeRecordInTable()}>Изменить</button>
                </div>
            </div>
        </div>
    )
}

export default Home;