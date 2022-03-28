import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Users() {

    const navigate = useNavigate()

    const [name,setname] = useState("")
    const [password,setpassword] = useState("")

    const [option,setoption] = useState("Register")

    const [callError,setCallError] = useState("")
    const [loginError,setloginError] = useState("")
  
    const [errorName,setErrorName] = useState("")
    const [errorPassword,setErrorPassword] = useState("")

    const [list,setlist] = useState([])

    useEffect(() => {

        axios.get('http://localhost:3333/users/')
            .then(list => setlist(list.data))
            .catch(err => console.log(err))

    },[])

    const handleSubmit = e => {
        e.preventDefault()
        setCallError("")
        setErrorName("")
        setErrorPassword("")

        if (option  == "Register") {
            const findItem = list.find((data,idx) => data.name == name)
            setloginError("")

            if (findItem) {
                setCallError("Your name is already taken")
            } else if (findItem == undefined) {
                if (name.length >= 6) {
                    setCallError("Your account has registered")
                    axios.post('http://localhost:3333/users/register', 
                            {
                                name:name,
                                password:password,
                            })
                        .then(res => console.log(res)
                        )
                        .catch(err => console.log(err))

                    axios.get('http://localhost:3333/users')
                            .then(res => {setlist(res.data);console.log(res.data)})
                            .catch(err => console.log(err))
                }
                else {
                    setCallError("Name or Password should be more than 6")
                }
            }
        
        } 
        else if ( option == "Login" ) {

            setCallError("")
            axios.get('http://localhost:3333/users')
                .then(res => {setlist(res.data);console.log(res.data)})
                .catch(err => console.log(err))

            const findName = list.find((data,i) => {
                if (data.name == name || data.password == password) {
                  if (data.name != name) {
                    setErrorName("Name Invalid")
                    return "F"
                  } else if (data.password != password) {
                    setErrorPassword("Password Invalid")
                    return "F"
                  } else {
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


    }

    return (
    <div className='container'>
      
        <div className="sub-container">

            {option == "Register" ? <>
            <div className="block">
                <form action="" onSubmit={e =>handleSubmit(e)}>

                    <h1> Register </h1>
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
      
        </div>

    </div>
    )
}

export default Users