import React from 'react'
import './hero.scss'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

import {FaPizzaSlice} from 'react-icons/fa'
function Hero() {

    const history=useHistory()

    var authButton='';

    const Logout=(e)=>{
        e.preventDefault()

        axios.post('logout').then(res=>{
          if(res.data.status===200)
          {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_user')
            swal('success',res.data.status);
            history.push('/')
          }
        })
    }
    
  if(!localStorage.getItem('auth_token'))
  {
    authButton=(
      <ul className='flex'>
      <li><Link to='/login'>Login</Link></li>
      <li><Link to='/register'>Register</Link></li>

    </ul>
    )
  }
  else{
    authButton=(
      <button onClick={Logout}>Logout</button>
      

    )
  }

  return (
    <div className='hero'>
        <div className="container">
            <div className="top">
                <div className="row">
                    <div className="div">
                    {authButton}
                    </div>
                    <div className="center">
                    <h2>Pizza</h2>
                    
                    </div>
                    <h4>Menu
                        <i><FaPizzaSlice/></i>
                    </h4>
                </div>
            </div>

            <div className="bottom">
                <h1>GREATEST PIZZA EVER</h1>
                <h4>READY IN 60 SECONDS</h4>
                <button>Place Order</button>
            </div>

        </div>
    </div>
  )
}

export default Hero