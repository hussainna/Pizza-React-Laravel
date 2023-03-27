import React, { useState }  from 'react'
import './style.css'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from "axios"
function Login() {

  const history=useHistory()

  const [Login,setLogin]=useState({
    email:'',
    password:'',
  })

  const handleInput=(e)=>{
    e.persist();
    setLogin({...Login,[e.target.name]:e.target.value})
  }


  const LoginSubmit=(e)=>{
    e.preventDefault();
    const data={
      email:Login.email,
      password:Login.password
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      
      axios.post('login',data).then(res=>{
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
    <div className='login'>
        <div className="container">
  <div className="row">
    <img src="./images/login.jpg"  className="img" />
  </div>
  <div className="row">
    <form onSubmit={LoginSubmit} className="form active" id="login">
      <h2>Login</h2>
      <label htmlFor="email">Email Address</label>
      <div className="pass-reset" onclick="activeInput(this)">
        <input type="email" name="email" onChange={handleInput} value={Login.email} className="email" id="emailInput" placeholder="name@mail.com" />
      </div>
      <label htmlFor="password">Password</label>
      <div className="pass-reset" onclick="activeInput(this)">
        <input type="password" className="password" name="password" onChange={handleInput} value={Login.password} id="password" placeholder="**********" />
        <a href="#" className="reset-password">Reset Password</a>
      </div>
  
      <button className="btn btn-login">Login</button>
    </form>

  </div>
</div>

    </div>
  )
}

export default Login