import React, { useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import TopBar from '../Topbar/TopBar'
import Sidebar from '../sidebar/Sidebar'
import '../products/product.css'
import axios from 'axios'
import {PacmanLoader} from 'react-spinners'
function User() {
    const history=useHistory()



    const [Items,setItems]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{

        axios.get('users').then(res=>{
            if(res.data.status===200)
            {
                setItems(res.data.user)
              
            }
            setLoading(false)

        })

    },[])

    var viewHTML='';
    if(loading)
    {
        return <PacmanLoader className='lazyLoading' color="#36d7b7" />
    }
    else
    {
        viewHTML=Items.map((item,idx)=>(
            <tr key={idx}>
                 <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
             
            </tr>
        ))
    }

  return (
    <div className='master product'>
                <TopBar/>
        <div className="cont">
        <Sidebar/>

        <div className="card">
            <div className="card-top">
                <h4>Users
                </h4>
            </div>
            <div className="card-body">
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewHTML}
                    </tbody>
                </table>
            </div>
        </div>

        </div>
       
    </div>
  )
}

export default User