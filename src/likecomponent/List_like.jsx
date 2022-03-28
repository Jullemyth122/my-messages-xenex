import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'

const Person = props => (
    <tr>
        
        <td>{props.person.fullname}</td>
        <td> <button onClick={e => props.handleLikes(props.person._id,props.person)}> Likes : {props.person.like} </button> </td>

    </tr>
)

function List_like() {
  
    const [person,setperson] = useState([])

    const [likes,setlikes] = useState(0)
    
    useEffect(() => {
        axios.get('http://localhost:5555/likers/')
            .then(res => {
                setperson(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    },[])

    const handleLikes = (id,currentPerson) => {
        setlikes(prevState => prevState + 1)
        axios.put('http://localhost:5555/likers/update/' + id, { fullname: currentPerson.fullname, likes: currentPerson.like + likes})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    const Declarations = () => {
        return person.map(currentPerson => {
            return <Person person={currentPerson} 
                handleLikes={e => handleLikes(e,currentPerson)}
                key={currentPerson._id}
            />
        })
    }

    return (
        <div>
            <h1>Person List </h1>

            <table>
                
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th> Likes </th>

                    </tr>
                </thead>

                <tbody>
                    {Declarations()}
                </tbody>
            </table>
        </div>
    )
}

export default List_like