import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import DatePicker2 from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

function EditHabitList_component() {

    const { id } = useParams
    const [habit_title,sethabit_title] = useState()
    const [description,setdescription] = useState()
    const [date_start,setdate_start] = useState(new Date())
    const [date_final,setdate_final] = useState(new Date())

    const handleHabitTitle = e => {
        sethabit_title(e.target.value)
    }
    const handleDescription = e => {
        setdescription(e.target.value)
    }
    const handleDateStart = e => {
        setdate_start(e)
    }
    const handleDateFinal = e => {
        setdate_final(e)
    }

    useEffect(() => {
        console.log(id)
        axios.get('http://localhost:5500/habit/update/'+id)
            .then(res => {
                sethabit_title(res.data.habit_title)
                setdescription(res.data.description)
                setdate_start(res.data.date_start)
                setdate_final(res.data.date_final)
                
            }).catch(err => {console.log(err)})
    },[id])

    const handleSubmit = e => {
        e.preventDefault()

        const habit = {
            habit_title:habit_title,
            description:description,
            date_start:date_start,
            date_final:date_final
        }

        axios.put('http://localhost:5500/habit/update/'+id,habit)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error :'+ err))

        window.location = '/'
    }   

    return (
        <div>

            <div className="container">
                <h1> Edit List </h1>
                <form action="" onSubmit={e => handleSubmit(e)}>

                    <div className="form-group">
                        <label htmlFor=""> Habit Title</label>
                        <input type="text"
                            className='form-group'
                            required
                            value={habit_title}
                            onChange={e => handleHabitTitle(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Description </label>
                        <input type="text"
                            className='form-group'
                            required
                            value={description}
                            onChange={e => handleDescription(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Starting Date of Habit</label>
                        <div>
                            <DatePicker
                                selected= {date_start}
                                value={date_start}
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
                                value={date_final}
                                onChange= {e => handleDateFinal(e)}
                            >
                            </DatePicker2>
                        </div>
                    </div>

                    <button type='submit'> Submit </button>

                </form>


            </div>

        </div>
    )
}

export default EditHabitList_component