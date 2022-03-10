import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import DatePicker2 from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

function CreateHabit_component() {

    const [habit_title,sethabit_title] = useState()
    const [description,setdescription] = useState()
    const [date_start,setdate_start] = useState(new Date())
    const [date_final,setdate_final] = useState(new Date())

    const handleHabitTitle = e => {
        sethabit_title(e.target.value)
        // console.log(e.target.value)
    }
    const handleHabitDescription = e => {
        setdescription(e.target.value)
        // console.log(e.target.value)
    }

    const handleDateStart = e => {
        setdate_start(e)
    }
    const handleDateFinal = e => {
        setdate_final(e)
    }

    const handleSubmit = e => {        
        e.preventDefault()

        const habit = {
            habit_title:habit_title,
            description:description,
            date_start:date_start,
            date_final:date_final
        }

        axios.post('http://localhost:5500/habit/add',habit)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error :' + err))
        
        window.location = '/'
    }

    return (
  
        <div className='container'>
            <h1> Create List</h1>

            <form action="" onSubmit={e => handleSubmit(e)}>

                <div className="form-group">
                    <label htmlFor=""> Habit Title </label>
                    <input 
                        type="text" 
                        className='form-group' 
                        required 
                        onChange={e => handleHabitTitle(e)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor=""> Description </label>
                    <input 
                        type="text" 
                        className='form-group' 
                        required 
                        onChange={e => handleHabitDescription(e)}
                        
                    />
                </div>
                    <div className="form-group">
                        <label htmlFor=""> Starting Date of Habit</label>
                        <div>
                            <DatePicker
                                selected= {date_start}
                                onChange= {e => handleDateStart(e)}
                            >
                            </DatePicker>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> End Date of Habit </label>
                        <div>
                            <DatePicker2
                                selected= {date_final}
                                onChange= {e => handleDateFinal(e)}
                            >
                            </DatePicker2>
                        </div>
                    </div>
                <button type="submit"> Submit </button>    
            

            </form>
        
        </div>
  
        )
}

export default CreateHabit_component