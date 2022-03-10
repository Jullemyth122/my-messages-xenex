import React from 'react'
import { useState,useEffect,useRef,useReducer } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const Health = props => (
    <tr>
        <td>{props.health.fullname}</td>
        <td>{props.health.temperature}</td>
        {/* <td>{props.health.email}</td>
        <td>{props.health.phonenumber}</td> */}
        <td>{new Date(Date.parse(props.health.date_start)).toDateString()}</td>
        <td>{new Date(Date.parse(props.health.date_final)).toDateString()}</td>
        <td>
            <Link to={'/edit/'+props.health._id}> Edit</Link>
            <a href="#" onClick={e =>{props.deleteHealth(props.health._id)}}> Delete </a>
        </td>
    

    </tr>
)

function Healthlist_component() {
  
    const [health,sethealth] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4500/health/')
            .then(res => {
                sethealth(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    },[])

    const deleteHealth = (id) => {
        console.log(id)
        axios.delete('http://localhost:4500/health/'+id)
            .then(res => console.log(res.data))
        sethealth(health.filter(el => el._id !== id))
    }

    const healthDeclarations = () => {
        return health.map(currentHealth => {
            return <Health health={currentHealth}
                deleteHealth = {e => deleteHealth(e)}
                key={currentHealth._id}
            />
        })
    }

    return (
        <div>
            <h1>Health List </h1>

            <table>
                
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th> Temperature </th>
                        <th> Email </th>
                        <th> Phone Number </th>
                        <th className='text-center'> Actions </th>
                    </tr>
                </thead>

                <tbody>
                    {healthDeclarations()}
                </tbody>
            </table>
        </div>
    )
}

export default Healthlist_component