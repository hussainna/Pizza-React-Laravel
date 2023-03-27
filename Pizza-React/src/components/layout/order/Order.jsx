import React, { useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import TopBar from '../Topbar/TopBar'
import Sidebar from '../sidebar/Sidebar'
import '../products/product.css'
import axios from 'axios'
import swal from 'sweetalert'
import {PacmanLoader} from 'react-spinners'
function Order() {
 
    const history=useHistory()




    const [Items,setItems]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{

        axios.get('orders').then(res=>{
            if(res.data.status===200)
            {
                setItems(res.data.order)
              
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
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>{item.address}</td>
                <td>{item.state}</td>
                <td>{item.zipcode}</td>

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
                <h4>Order
                </h4>
            </div>
            <div className="card-body">
                <table>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>State</th>
                            <th>Zip Code</th>


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

export default Order