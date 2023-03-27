import React from 'react'
import './check.scss'
import  { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import axios from "axios"

function Checkout() {


    const history=useHistory()
    const [CartItems,setCart]=useState([])
    const [checkoutItem,setCheckout]=useState({
        firstname:'',
        lastname:'',
        phone:'',
        email:'',
        address:'',
        city:'',
        state:'',
        zipcode:'',

    })


    
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

    const handleInput=(e)=>{
        e.persist()

        setCheckout({...checkoutItem,[e.target.name]:e.target.value})
    }



    
    const submitOrder=(e,payment_mode)=>{
        e.preventDefault();
        const data={
            firstname:checkoutItem.firstname,
            lastname:checkoutItem.lastname,
            phone:checkoutItem.phone,
            email:checkoutItem.email,
            address:checkoutItem.address,
            city:checkoutItem.city,
            state:checkoutItem.state,
            zipcode:checkoutItem.zipcode,
            payment_mode:'COD',
            payment_id:'1',
        }

                axios.post('place-order',data).then(res=>{
                    if(res.data.status===200)
                    {
                        swal('Order Placed Successfully',res.data.message)
                        setError([])
                        history.push('/')
                    }
                    else if(res.data.status===422)
                    {
                        swal('all feaild are mandetory')
                        setError(res.data.errors)
                    }
                });
          
        
    }



  return (
    <div className='place'>
        <div className="container">
        <div className="flex">

        
<div className="left">

    <div className='grid-2'>
        <div className="col">
        <label htmlFor="">First Name</label> 
       <input type="text" name="firstname" onChange={handleInput} value={checkoutItem.firstname} id="" />
        </div>
        <div className="col">
             <label htmlFor="">last Name</label>
            <input type="text" name="lastname" onChange={handleInput} value={checkoutItem.lastname} id="" />
        </div>
            
           
            <div className="col">
                 <label htmlFor="">Phone Number</label>
                <input type="text" name="phone" onChange={handleInput} value={checkoutItem.phone} id="" />
            
            </div>
               
            <div className="col">
                <label htmlFor="">Email Address</label>
                <input type="text" name="email" onChange={handleInput} value={checkoutItem.email} id="" />
            </div>
                
            
            <div className="col">
                <label htmlFor="">Full Address</label>
                <textarea rows='3' id="" name='address' onChange={handleInput} value={checkoutItem.address} />
            </div>
            
                
            
            <div className="col">
                 <label htmlFor="">City</label>
                <input type="text" name="city" onChange={handleInput} value={checkoutItem.city} id="" />
            
            </div>
            
               
            <div className="col">
                
                <label htmlFor="">State</label>
                <input type="text" name="state" onChange={handleInput} value={checkoutItem.state} id="" />
            
            
            </div>
            
            <div className="col">
                        <label htmlFor="">Zip Code</label>
                <input type="text" name="zipcode" onChange={handleInput} value={checkoutItem.zipcode} id="" />
            
            </div>
            
        
            <div className="col">
            <button onClick={(e)=>submitOrder(e)}>Place Order</button>
            </div>
            
    </div>
    
</div>

<div className="right">
    
<table>
    <thead>
        <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
    </thead>
    <tbody>
        {CartItems.map((item,idx)=>{
                            totalPrice=item.products.price*item.qty
                            return(
                <tr>
                    <td><img src='./images/product-1.jpg' width='50px' alt="" /></td>
                    <td>{item.products.name}</td>
                    <td>{item.products.price}</td>
                    <td>{item.qty}</td>
                </tr>
            )
        })}
    </tbody>
</table>
<div className="card">
    <h4>Total:
        <span>{totalPrice}</span>
    </h4>
    
</div>

</div>
</div>
        </div>
    </div>
  )
}

export default Checkout