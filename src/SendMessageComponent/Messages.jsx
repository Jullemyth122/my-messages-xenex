import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Message = e => (
    <div className='box'>
        <div className="names"> <h4> {e.messages.name} </h4> </div>
        <div className="description"> <h5> {e.messages.description} </h5> </div>
    </div>
)

function Messages() {
    const [starter,setstarter] = useState([])
    const [filterSearch,setfilterSearch] = useState(starter)
    const [search,setsearch] = useState("")

    const [name,setname] = useState("")
    const [description,setdescription] = useState("")


    useEffect(() => {
        axios.get('https://website-messages-xenex.herokuapp.com/')
            .then(res => {
                setstarter(res.data)
                setfilterSearch(res.data)
            }).catch(err => {
                console.log(err)
            })
    },[])

    useEffect(() => {
        setfilterSearch(starter.filter((currentMessages,idx)=> {
            return(
                currentMessages.name.toLowerCase().includes(search.toLowerCase())
            )
        }))
    },[])

    const handleSearch = (e) => {
        setsearch(e.target.value)
    }

    const onSearch = e => {
        e.preventDefault()
        setfilterSearch(starter.filter((currentMessages,idx) => {
            return(
                currentMessages.name.toLowerCase().includes(search.toLowerCase())
            )
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post('https://website-messages-xenex.herokuapp.com/add',{
            name:name,
            description:description
        })
    }

    const handleNameChange = e => {
        setname(e.target.value)
    }

    const handleDescriptionChange = e => {
        setdescription(e.target.value)
    }


    return (
    <div className='container'>
        <div className="sub-container">
            <div className="owner">
                <h2>Owner</h2>
                <h3> Xenex </h3>
            </div>
            <div className="send-messages">
                <form action="" onSubmit={e => handleSubmit(e)} className="handleMessages">
                    <div className="top">
                        <label htmlFor=""> Secret Name</label>
                        <input 
                            type="text"
                            className='name-text' 
                            onChange={e => handleNameChange(e)}
                        />
                    </div>
                    <div className="body">
                        <textarea 
                            name="text"
                            type="text"
                            className='body-text'  
                            cols="30" 
                            rows="10"
                            onChange={e => handleDescriptionChange(e)}
                        />
                    </div>
                    <div className="submit"><button type='submit'> Send </button></div>
                </form>
            </div>
            
            <div className="messages-list">
                <div className="search-bar">
                    <div className="title">
                        <h1> Messages </h1>
                    </div>
                    <form action="" onSubmit={e => onSearch(e)}>
                        <input type="text" 
                            value={search}
                            onChange={e => handleSearch(e)}
                        />
                        <button type='submit'> <ion-icon name="search-outline"></ion-icon> </button>
                    </form>
                </div>
                <div className="search-list">
                {filterSearch.map((currentMessages,idx) => {
                    return <Message
                        key = {idx}
                        messages = {currentMessages}
                    />
                })}
                </div>
            </div>
        
        </div>
    </div>
  
    )
}

export default Messages