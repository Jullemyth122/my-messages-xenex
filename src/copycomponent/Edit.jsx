import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'

function Edit() {
    const { id } = useParams()
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

    const handleAge = e => {
        setage(e.target.value)
    }
    const handleHeight = e => {
        setheight(e.target.value)
    }
    const handleWeight = e => {
        setweight(e.target.value)
    }

    const handleDateBirth = e => {
        setdate_birth(e)
    }

    useEffect(() => {
        console.log(id)
        axios.get('http://localhost:7777/starter/update/'+ id )
            .then(res => {
                setfullname(res.data.fullname)
                setnickname(res.data.nickname)
                setage(res.data.age)
                setheight(res.data.height)
                setweight(res.data.weight)
                setdate_birth(res.data.date_birth)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    const handleSubmit = e => {        
        e.preventDefault()
        console.log(id)
        const starter = {
            fullname:fullname,
            nickname:nickname,
            age:age,
            height:height,
            weight:weight,
            date_birth:date_birth
        }
        axios.put('http://localhost:7777/starter/update/'+ id,starter)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error :' + err))
        
        window.location = '/'
    }

    return (
  
        <div className='container'>
            <h1> Update Starter </h1>
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
                        type="text" 
                        className='form-group' 
                        required 
                        value={nickname}
                        onChange={e => handleNicknameChange(e)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor=""> Age </label>
                    <input 
                        type="age" 
                        className='form-group' 
                        required
                        value={age} 
                        onChange={e => handleAge(e)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor=""> Height </label>
                    <input 
                        type="number" 
                        className='form-group' 
                        required
                        value={height} 
                        onChange={e => handleHeight(e)}
                        
                    />
                </div>
                    <div className="form-group">
                        <label htmlFor=""> Weight </label>
                        <input type="number" 
                            className='form-group'
                            required
                            value={weight}
                            onChange={e => handleWeight(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> End Date of Habit </label>
                        <div>
                            <DatePicker
                                selected= {date_birth}
                                value={date_birth}
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

export default Edit