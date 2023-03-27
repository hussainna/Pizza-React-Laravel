import React from 'react'
import './css/all.min.css'
import './css/style.css#'
import { Link, useHistory, withRouter } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import {PacmanLoader} from 'react-spinners'
import swal from 'sweetalert'
import axios from 'axios'

function Single(props) {

  const [Product,setProduct]=useState([])
  const [Qty,setQty]=useState(0)
  var info=''

  const history=useHistory();

  const increment=()=>{
    setQty(prevCount=>prevCount + 1)
  }
  const decrements=()=>{
    setQty(prevCount=>prevCount - 1)
  }

  useEffect(()=>{
    const pizza_id=props.match.params.id;
    console.log(pizza_id)
        axios.get(`single-pizza/${pizza_id}`).then(res=>{
          if(res.data.status===200)
          {
              setProduct(res.data.product)
              console.log('product',Product)

              
          }
      })


    },[props.match.params.id])

    const AddToCart=(e)=>{
      e.preventDefault();
      const data={
        product_id:Product.id,
        qty:Qty,

      }
      axios.post('insert-cart',data).then(res=>{
        if(res.data.status===201)
            {
                swal('succuss',res.data.message)
            }
            else if('error',res.data.status===409)
            {
                swal('error',res.data.message)
            }
            else if(res.data.status===401)
            {
                swal('error',res.data.message)
            }
      })
    }

  

  return (
    <div className='single'>
          <div className="container">

          <div className="box">
                <div className="images">
                  <div className="img-holder ">
                    <img src="./images/product-1.jpg" alt="" />
                  </div> 
                  
                </div>
                <div className="basic-info">
                  <h1>{Product.name}</h1>
                  <div className="rate">
                    <i className="filled fas fa-star" />
                    <i className="filled fas fa-star" />
                    <i className="filled fas fa-star" />
                    <i className="filled fas fa-star" />
                    <i className="filled fas fa-star" />
                  </div>
                  <span>${Product.price}</span>
                  <div className="count">
                    <button onClick={increment}>+</button>
                    <label>{Qty}</label>
                    <button onClick={decrements}>-</button>

                  </div>
                  <div className="options">
                    <Link to='/cart'>Show Cart</Link>
                    <button onClick={AddToCart}>Add to Cart</button>
                  </div>
                </div>
                <div className="description">
                  <p>{Product.description}</p>
                 
                </div>
              </div>
          
          </div>

    </div>
  )
}

export default withRouter(Single)