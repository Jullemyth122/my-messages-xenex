import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'

function Create() {

    const [fullname,setfullname] = useState()
    const [nickname,setnickname] = useState()
    const [age,setage] = useState()
    const [height,setheight] = useState()
    const [weight,setweight] = useState()
    const [date_birth,setdate_birth] = useState(new Date())

    const handleFullNameChange = e => {
        setfullname(e.target.value)
        // console.log(e.target.value)
    }
    const handleNicknameChange = e => {
        setnickname(e.target.value)
        // console.log(e.target.value)
    }
    const handleAgeChange = e => {
        setage(e.target.value)
        // console.log(e.target.value)
    }
    const handleHeight = e => {
        setheight(e.target.value)
        // console.log(e.target.value)
    }

    const handleWeight = e => {
        setweight(e.target.value)
    }

    const handleDateBirth = e => {
        setdate_birth(e)
    }


    const handleSubmit = e => {        
        e.preventDefault()

        const starter = {
            fullname:fullname,
            nickname:nickname,
            age:age,
            height:height,
            weight:weight,
            date_birth:date_birth
        }
        

        axios.post('http://localhost:7777/starter/add',starter)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error :' + err))
        
        window.location = '/'
    }

    return (
  
        <div className='container'>
            <h1> Create List</h1>

            <form action="" onSubmit={e => handleSubmit(e)}>

                <div className="form-group">
                    <label htmlFor="">Full Name</label>
                    <input 
                        type="text" 
                        className='form-group' 
                        required 
                        onChange={e => handleFullNameChange(e)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor=""> Nickname </label>
                    <input 
                        type="text" 
                        className='form-group' 
                        required 
                        onChange={e => handleNicknameChange(e)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor=""> Age </label>
                    <input 
                        type="number" 
                        className='form-group' 
                        required 
                        onChange={e => handleAgeChange(e)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor=""> Height </label>
                    <input 
                        type="text" 
                        className='form-group' 
                        required 
                        onChange={e => handleHeight(e)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor=""> Weight </label>
                    <input 
                        type="text" 
                        className='form-group' 
                        required 
                        onChange={e => handleWeight(e)}
                        
                    />
                </div>
                    <div className="form-group">
                        <label htmlFor=""> Starter</label>
                        <div>
                            <DatePicker
                                selected= {date_birth}
                                onChange= {e => handleDateBirth(e)}
                            >
                            </DatePicker>
                        </div>
                    </div>
                <button type="submit"> Submit </button>    
            

            </form>
        
        </div>
  
        )
}

export default Create