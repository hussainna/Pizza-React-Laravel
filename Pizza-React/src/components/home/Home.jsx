import React from 'react'
import Hero from './hero/Hero'
import '../../sass/main.scss'
import Pizza from './pizza/Pizza'
import Order from './order/Order'
import Sweet from './sweet/Sweet'
import Footer from './footer/Footer'
import { useState } from 'react'
import { useEffect } from 'react'
import {PacmanLoader} from 'react-spinners'
import axios from 'axios'


function Home() {

  const [Loading,setLoading]=useState(true)

    useEffect(()=>{
        axios.get('all-products').then(res=>{
            if(res.data.status===200)
            {
                console.log('welcome');
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
    <div>
     <Hero/>
     <Pizza/>
     <Order/>
     <Sweet/>
     <Footer/>
    </div>
  )
}

export default Home