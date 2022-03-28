import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Starter = props => (
    <tr>
        <td>{props.starter.fullname}</td>
        <td>{props.starter.nickname}</td>
        <td>{props.starter.age}</td>
        <td>{props.starter.height}</td>
        <td>{props.starter.weight}</td>
        <td>{new Date(Date.parse(props.starter.date_birth)).toDateString()}</td>
        <td>
            <Link to={'/edit/'+props.starter._id}> Edit</Link>
            <a href="#" onClick={e =>{props.deleteStarter(props.starter._id)}}> Delete </a>
        </td>
    

    </tr>
)

function List() {
  
    const [starter,setstarter] = useState([])
    const [filtersearch,setfiltersearch] = useState(starter)
    const [search,setsearch] = useState("")
    let title = {search:""}


    useEffect(() => {
        axios.get('http://localhost:9999/starter/')
            .then(res => {
                setstarter(res.data)
                setfiltersearch(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])


    const handleSearch = (e) => {
        setsearch(e.target.value)
    }
    
    // useEffect(() => {
    //     setfiltersearch(starter.filter((currentStarter,idx) => {
    //         return(
    //             currentStarter.fullname.toLowerCase().includes(search.toLowerCase())
    //         )
    //         })
    //     )
    // },[search])


    // const onSearch = (e) => {
    //     e.preventDefault()
    // }

    // if we want controlled search 
    useEffect(() => {
        setfiltersearch(starter.filter((currentStarter,idx) => {
            return(
                currentStarter.fullname.toLowerCase().includes(search.toLowerCase())
            )
            })
        )
    },[])
    const onSearch = (e) => {
        e.preventDefault()
        setfiltersearch(starter.filter((currentStarter,idx) => {
            return(
                currentStarter.fullname.toLowerCase().includes(search.toLowerCase())
            )
            })
        )
    }

    const deleteStarter = (id) => {
        console.log(id)
        axios.delete('http://localhost:7777/starter/'+id)
            .then(res => console.log(res.data))
        setstarter(starter.filter(el => el._id !== id))
        setfiltersearch(filtersearch.filter(el => el._id !== id))
    }

    const starterDeclarations = () => {
        return starter.map(currentStarter => {
            return <Starter starter={currentStarter}
                deleteStarter = {e => deleteStarter(e)}
                key={currentStarter._id}
            />
        })
    }

    // const showList = starter.filter((currentStarter,idx) => {
    //     return(
    //         currentStarter.fullname?.toLowerCase().includes(search.toLowerCase())
    //     )
    // }).map((currentStarter,idx) => {
    //     return <Starter starter={currentStarter}
    //             deleteStarter = {e => deleteStarter(e)}
    //             key={currentStarter._id}
    //         />
    // })

    return (
        <div>
            <h1>Starter List </h1>

            <div>
                Search Item
                <form action="" onSubmit={e => onSearch(e)}>
                    <input type="text" 
                        value={search}
                        onChange={e => handleSearch(e)}
                    />
                    <button type='submit'> search </button>
                </form>

            </div>
            <table>
                <thead>
                    <tr>
                        <th> Full Name </th>
                        <th> Nickname </th>
                        <th> Age </th>
                        <th> Height </th>
                        <th> Weight </th>
                        <th> Date Birth </th>
                        <th className='text-center'> Actions </th>
                    </tr>
                </thead>

                <tbody>
                    {/* {starterDeclarations()} */}
                    {filtersearch.map((currentStarter,idx) => {
                        return <Starter starter={currentStarter}
                                deleteStarter = {e => deleteStarter(e)}
                                key={currentStarter._id}
                            />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default List