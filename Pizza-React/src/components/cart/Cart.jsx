import './cart.scss'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Cart() {

    const [CartItems,setCart]=useState([])

  

    var totalPrice=0;
    useEffect(()=>{
        axios.get('get-cart').then(res=>{
           if(res.data.status===200)
           {
            setCart(res.data.cart)
            setLoading(false)
           }
           else if(res.data.status===401)
           {
            history.push('/')
            swal('Error',res.data.message)
           } 
        })
    },[])


    var totalPrice=''

  return (
    <div className='cart'>
        <div className="container">
        <div className="card">
            <div className="card-top">
                <h4>Carts
                </h4>
            </div>
            <div className="card-body">
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>price</th>
                            <th>Quantity</th>
                            <th>image</th>
                            <th>Remove</th>

                        </tr>
                    </thead>
                    <tbody>
                        {CartItems.map((item,idx)=>{
                            totalPrice=item.products.price*item.qty
                            return(
                                 <tr key={idx}>
                                <td>{item.products.name}</td>
                                <td>{item.products.price}</td>
                                <td>{item.qty}</td>
                                <td><img  src="./images/product-1.jpg" alt="" /></td>

                                <td><button>Remove</button></td>
                            </tr>
                            )
                           
                            })}
                    </tbody>
                </table>
                <div className="card-bottom">
                  <h4>Total:
                        <span>{totalPrice}</span>
                </h4>
                   <hr />
                    <Link className='checkout' to='/checkout'>Check Out</Link>
        </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Cart