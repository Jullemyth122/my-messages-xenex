import axios from 'axios'
import React, { useState } from 'react'


function Create_like() {
  
    const [fullname,setfullname] = useState()

    const handleFullNameChange = e => {
        setfullname(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()

        axios.post('http://localhost:5555/likers/add',{ fullname:fullname })
            .then(p => console.log('Name Record Added'))
            .catch(err => console.log(err))

        // window.location = '/'

    }

    return (
        
    <div>

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
            <button type='submit'> Submit </button>
        </form>

    </div>
  
  )
}

export default Create_like