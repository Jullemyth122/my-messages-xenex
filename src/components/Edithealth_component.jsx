import React from 'react'
import { useState,useEffect,useRef,useReducer } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import DatePicker2 from 'react-datepicker'
function Edithealth_component() {
    const { id } = useParams()
    const [fullname,setfullname] = useState()
    const [temperature,settemperature] = useState()
    // const [email,setemail] = useState()
    // const [phonenumber,setphonenumber] = useState()
    const [date_start,setdate_start] = useState(new Date())
    const [date_final,setdate_final] = useState(new Date())

    const handleFullNameChange = e => {
        setfullname(e.target.value)
        // console.log(e.target.value)
    }
    const handleTemperatureChange = e => {
        settemperature(e.target.value)
        // console.log(e.target.value)
    }
    // const handleEmailChange = e => {
    //     setemail(e.target.value)
    //     // console.log(e.target.value)
    // }
    // const handlePhoneNumberChange = e => {
    //     setphonenumber(e.target.value)
    //     // console.log(e.target.value)
    // }

    const handleDateStart = e => {
        setdate_start(e)
    }
    const handleDateFinal = e => {
        setdate_final(e)
    }

    useEffect(() => {
        console.log(id)
        axios.get('http://localhost:4500/health/update/'+ id )
            .then(res => {
                setfullname(res.data.fullname)
                settemperature(res.data.temperature)
                // setemail(res.data.email)
                // setphonenumber(res.data.phonenumber)
                setdate_start(res.data.date_start)
                setdate_final(res.data.date_final)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    const handleSubmit = e => {        
        e.preventDefault()
        console.log(id)
        const health = {
            fullname:fullname,
            temperature:temperature,
            // email:email,
            // phonenumber:phonenumber,
            date_start:date_start,
            date_final:date_final
        }
        axios.put('http://localhost:4500/health/update/'+ id,health)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error :' + err))
        
        window.location = '/'
    }

    return (
  
        <div className='container'>
            <h1> Update Health </h1>
            {(id)}

            <form action="" onSubmit={e => handleSubmit(e)}>

                <div className="form-group">
                    <label htmlFor="">Full Name</label>
                    <input 
                        type="text" 
                        className='form-group' 
                        required 
                        value={fullname}
                        onChange={e => handleFullNameChange(e)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Temperature </label>
                    <input 
                        type="number" 
                        className='form-group' 
                        required 
                        value={temperature}
                        onChange={e => handleTemperatureChange(e)}
                        
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="">Email </label>
                    <input 
                        type="email" 
                        className='form-group' 
                        required
                        value={email} 
                        onChange={e => handleEmailChange(e)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Phone Number</label>
                    <input 
                        type="text" 
                        className='form-group' 
                        required
                        value={phonenumber} 
                        onChange={e => handlePhoneNumberChange(e)}
                        
                    />
                </div> */}
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
                <button type="submit"> Submit </button>    
            

            </form>
        
        </div>
  
        )
}

export default Edithealth_component