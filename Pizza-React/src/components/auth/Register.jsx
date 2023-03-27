import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from "axios"

function Register() {

  const history=useHistory()

  const [Register,setRegister]=useState({
    email:'',
    name:'',
    password:'',
  })

  const handleInput=(e)=>{
    e.persist();
    setRegister({...Register,[e.target.name]:e.target.value})
  }


  const RegisterSubmit=(e)=>{
    e.preventDefault();
    const data={
      name:Register.name,
      email:Register.email,
      password:Register.password
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      
      axios.post('register',data).then(res=>{
        if(res.data.status===200)
        {
          localStorage.setItem('auth_token',res.data.token)
          localStorage.setItem('auth_user',res.data.user)
          swal('success',res.data.message,'success')
          history.push('/')
        }
      })
      
  });

  }

  return (
    <div className='login register'>
        <div className="container">
  <div className="row">
    <img src="./images/login.jpg"  className="img" />
  </div>
  <div className="row">
    <form onSubmit={RegisterSubmit} className="form active" >
      <h2>Register</h2>
      <label htmlFor="email">User Name</label>
      <div className="pass-reset">
        <input type="text" name="name" onChange={handleInput} value={Register.name} className="email" id="emailInput" placeholder="user name" />
      </div>
      <label htmlFor="email">Email Address</label>
      <div className="pass-reset">
        <input type="email" name="email" value={Register.email} onChange={handleInput} className="email" id="emailInput" placeholder="name@mail.com" />
      </div>
      <label htmlFor="password">Password</label>
      <div className="pass-reset">
        <input type="password" value={Register.password} onChange={handleInput} className="password" name="password" id="password" placeholder="**********" />
        <a href="#" className="reset-password">Reset Password</a>
      </div>
    
      <button className="btn btn-login">Register</button>
   
    </form>
    
  </div>
</div>

    </div>
  )
}

export default Register