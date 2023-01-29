import '../App.css'
import {useEffect, useState} from 'react'

const Home = () => {

    const [backendData, setBackendData] = useState([{}])

    // useEffect(() =>  {
    //     fetch("/api").then(
    //         responce => responce.json()
    //     ).then(
    //         data => {
    //             setBackendData(data)
    //         }
    //     )
    //     console.log(backendData)
    // }, [])

    const ShowData = () => {
        try{
            fetch("/api").then(
                responce => responce.json()
            ).then(
                data => {
                    setBackendData(data)
                }
            )
        }
        catch(err) {
            console.log(err)
        }
    }

    return(
        <div className='container'>
            <button onClick = {() => ShowData()}>{JSON.stringify(backendData)}</button>
        </div>
    )
}

export default Home;