import React from 'react'
import { sweetData } from '../../data/Data'
import './sweet.scss'
function Sweet() {
  return (
    <div className='sweet'>
        <div className="container">
            <h1>Sweet Treats for You</h1>
            <div className="row">
                {sweetData.map((item,idx)=>(
                    <div key={idx} className="col">
                        <img src={item.img} alt="" />
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <h4 className="price">${item.price}</h4>
                        <button>Add To Cart</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Sweet