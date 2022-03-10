import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Habit = props => (
    <tr>
        <td>{props.habit.habit_title}</td>
        <td>{props.habit.description}</td>
        {/* <td>{props.habit.email}</td>
        <td>{props.habit.phonenumber}</td> */}
        <td>{new Date(Date.parse(props.habit.date_start)).toDateString()}</td>
        <td>{new Date(Date.parse(props.habit.date_final)).toDateString()}</td>
        <td>
            <Link to={'/edit/'+props.habit._id}> Edit</Link>
            <a href="#" onClick={e =>{props.deleteHabit(props.habit._id)}}> Delete </a>
        </td>
    

    </tr>
)

function HabitList_component() {
  
    const [habit,sethabit] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5500/habit/')
            .then(res => {
                sethabit(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    },[])

    const deleteHabit = (id) => {
        console.log(id)
        axios.delete('http://localhost:5500/habit/'+id)
            .then(res => console.log(res.data))
        sethabit(habit.filter(el => el._id !== id))
    }

    const habitDeclarations = () => {
        return habit.map(currentHabit => {
            return <Habit habit={currentHabit}
                deleteHabit = {e => deleteHabit(e)}
                key={currentHabit._id}
            />
        })
    }

    return (
        <div>
            <h1>Habit List </h1>

            <table>
                
                <thead>
                    <tr>
                        <th> Habit Title</th>
                        <th> Description </th>
                        <th> Date Start </th>
                        <th> Date Final </th>
                        <th className='text-center'> Actions </th>
                    </tr>
                </thead>

                <tbody>
                    {habitDeclarations()}
                </tbody>
            </table>
        </div>
    )
}

export default HabitList_component