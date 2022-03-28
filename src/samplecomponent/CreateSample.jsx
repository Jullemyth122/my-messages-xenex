import axios from 'axios'
import React, { useState } from 'react'

function CreateSample() {
  
    const [name,setname] = useState()
    const [number,setnumber] = useState(0)

    const handleNameChange = e => {
        setname(e.target.value)
    }

    const handleNumberChange = e => {
        setnumber(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const data = {
            name:name,
            number:number
        }

        axios.post('http://localhost:1212/practice1/add', data)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error:' + err))

        window.location = '/'

    }

    return (
        <div>

            <form action="" onSubmit={e =>handleSubmit(e)}>

                <div className="form-group">
                    <label htmlFor=""> Name </label>
                    <input 
                        type="text" 
                        className='form-group' 
                        required 
                        onChange={e => handleNameChange(e)}
                        
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor=""> Number </label>
                    <input 
                        type="text" 
                        className='form-group' 
                        required 
                        onChange={e => handleNumberChange(e)}
                        
                    />
                </div>
                
                <button type='submit'> Submit </button>
            </form>

        </div>
    )
}

export default CreateSample