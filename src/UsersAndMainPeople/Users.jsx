import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Users() {
  
  const navigate = useNavigate()

  const [NameNav,setNameNav] = useState("")

  const [name,setname] = useState("")
  const [password,setpassword] = useState("")
  const [key,setkey] = useState("")
  
  const [option,setoption] = useState("Register")
  const [callError,setCallError] = useState("")
  const [loginError,setloginError] = useState("")

  const [errorName,setErrorName] = useState("")
  const [errorPassword,setErrorPassword] = useState("")

  const [list,setlist] = useState([])
  const [listid,setlistid] = useState([])


  useEffect(() => {

      axios.get('http://localhost:7171/users/')
        .then(list => {setlist(list.data);
          console.log(list.data)
        })
        .catch(err => console.log(err))

      axios.get('http://localhost:7171/likes')
        .then(listid => setlistid(listid.data))
        .catch(err => console.log(err))

  },[])

  const handleSubmit = e => {
    
    e.preventDefault()
    setCallError("")
    setErrorName("")
    setErrorPassword("")
    
    if (option == "Register") {

      const Inputs = {name:name,password:password,key:key}

      const findItem = list.find((data,i) => data.name == name || data.key == key)
      setloginError("")
      if (findItem) {
        
        setCallError("Your Name or Key is already taken")

      } else if (findItem == undefined) {

        setCallError("Name or Password should be more than 6")
        if (name.length >= 6 && key.length >= 6) {
          setCallError("Your Account has Registered")

          axios.post('http://localhost:7171/users/register',Inputs)
          .then(res => console.log(res.data)
          )
          .catch(err => console.log(err))

          axios.get('http://localhost:7171/users/')
          .then(list => {setlist(list.data);
            console.log(list.data)
          }).catch(err => console.log(err))

          axios.post(`http://localhost:7171/likes/item/${listid[0]._id}`,
                        { people:
                          [{confirmation_like:false,
                            confirmation_dislike:false,
                            confirmation_favorite:false,
                            key:key,name:name}]}

                        )
          axios.post(`http://localhost:7171/likes/item/${listid[1]._id}`,
                        { people:
                          [{confirmation_like:false,
                            confirmation_dislike:false,
                            confirmation_favorite:false,
                            key:key,name:name}]}

                        )
          axios.post(`http://localhost:7171/likes/item/${listid[2]._id}`,
                        { people:
                          [{confirmation_like:false,
                            confirmation_dislike:false,
                            confirmation_favorite:false,
                            key:key,name:name}]}

                        )
          axios.post(`http://localhost:7171/likes/item/${listid[3]._id}`,
                        { people:
                          [{confirmation_like:false,
                            confirmation_dislike:false,
                            confirmation_favorite:false,
                            key:key,name:name}]}

                        )
          axios.post(`http://localhost:7171/likes/item/${listid[4]._id}`,
                        { people:
                          [{confirmation_like:false,
                            confirmation_dislike:false,
                            confirmation_favorite:false,
                            key:key,name:name}]}

                        )   

        }
      }
      
      setname("")
      setpassword("")
      setkey("")

    }
    
    else if (option == "Login") {

        setCallError("")

        const findName = list.find((data,i) => {
            if (data.name == name || data.password == password) {
              if (data.name != name) {
                setErrorName("Name Invalid")
                return "F"
              } else if (data.password != password) {
                setErrorPassword("Password Invalid")
                return "F"
              } else {
                setNameNav(data.name)
                setloginError("Your account has been login")
                navigate('/', { state: { name }})
                return "T"
              }
            } 
          }
        )

        console.log(findName)
        if (findName == undefined) {
          setErrorName("Name Invalid");setErrorPassword("Password Invalid")
        } 
    }

    else if (option == "Forgot") {

    }

  
  }

  
  return (
    
    <div className='container'>
      
      <div className="sub-container">

      {option == "Register" ? <>
      <div className="block">
        <form action="" onSubmit={e =>handleSubmit(e)}>

        <h1> Register </h1>

        <div className="form-group">
            <label htmlFor=""> Key </label>
            <input type="text" className="form-group-input" name='key'
                value={key}

                onChange={e => setkey(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor=""> Name </label>
            <input type="text" className="form-group-input" name='name'
                value={name}

                onChange={e =>setname(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor=""> Password </label>
            <input type="password" className="form-group-input" name='password'
                value={password}
                onChange={e => setpassword(e.target.value)}
            />
        </div>
        {callError}
        <button type='submit'> Submit </button>

        </form>

        <div className="options">
            <button type="submit" className="option-click" onClick={e => setoption("Forgot")}> Forget Password </button>
            <button type="submit" className="option-click" onClick={e => setoption("Login")}> Login </button>
        </div>

      </div>
      </> : <></>}
      
      {option == "Login" ? <>
      
      <div className="block">
        <form action="" onSubmit={e =>handleSubmit(e)}>
          <h1> Login </h1>

          <div className="form-group">
              <label htmlFor=""> Name </label>
              <input type="text" className="form-group-input" name='name'
                  value={name}
                  onChange={e =>setname(e.target.value)}
              />
              <label htmlFor=""> { errorName } </label>
          </div>
          <div className="form-group">
              <label htmlFor=""> Password </label>
              <input type="password" className="form-group-input" name='password'
                  value={password}
                  onChange={e => setpassword(e.target.value)}
              />
              <label htmlFor=""> { errorPassword } </label>
          </div>
          {loginError}

          <button type='submit'> Submit </button>

        </form>

        <div className="options">
            <button type="submit" className="option-click" onClick={e => setoption("Register")}> Register </button>
            <button type="submit" className="option-click" onClick={e => setoption("Forgot")}> Forgot </button>
        </div>

      </div>

      </> : <></>}
      
      {option == "Forgot" ? <>
      
      <div className="block">
        <form action="" onSubmit={e =>handleSubmit(e)}>

          

        </form>
      </div>

      </> : <></>}

      </div>

    </div>
  )
}

export default Users