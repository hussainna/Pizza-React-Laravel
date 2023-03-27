import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { pizzaData } from '../../data/Data'
import {PacmanLoader} from 'react-spinners'
import { Link } from 'react-router-dom'
import './pizza.scss'
function Pizza() {

    const [Pizza,setPizza]=useState([])
    const [Loading,setLoading]=useState(true)

    useEffect(()=>{
        axios.get('all-products').then(res=>{
            if(res.data.status===200)
            {
                setPizza(res.data.product);
            }
            setLoading(false)
        })
    },[])


    if(Loading){

        return(
    
          <PacmanLoader className='lazyLoading' color="#36d7b7" />
    
        )
    
      }
    

  return (
    <div className='pizza'>
        <div className="container">
            <h1>Choose your favorite</h1>
            <div className="row">
                {Pizza.map((item,idx)=>(
                    <div key={idx} className="col">
                        <img src='./images/product-1.jpg' alt="" />
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <h4 className="price">${item.price}</h4>
                        <Link to={`/single-pizza/${item.id}`}>Add To Cart</Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Pizza