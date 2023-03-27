import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import TopBar from '../Topbar/TopBar'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios'
import swal from 'sweetalert'

function AddProduct() {

  const [img,setImage]=useState([])

  const history=useHistory()

  const [Input,setInput]=useState({
    name:'',
    price:'',
    description:'',
    
  
})

  const handleInput=(e)=>{
    e.persist()
    setInput({...Input,[e.target.name]:e.target.value})
  }

  const handleImage=(e)=>{
    e.persist();
    setImage({image:e.target.files[0]})
}
  const InsertProduct=(e)=>{
    e.preventDefault()

    const formData=new FormData();
    formData.append('image',img.image)
    formData.append('name',Input.name)
    formData.append('price',Input.price)
  
    formData.append('description',Input.description)
    
    
    axios.get("/sanctum/csrf-cookie").then(async () => {
      
      axios.post('insert-product',formData).then(res=>{
        if(res.data.status===200)
        {
          swal('success',res.data.message)
          history.push('/admin/products')
        }
      })


      });
    
  }

  return (
    <div className='master Add'>
                <TopBar/>
        <div className="cont">
        <Sidebar/>

        <div className="card">
            <div className="card-top">
                <h4>Products
                    <Link to='/admin/products'>Back</Link>
                </h4>
            </div>
            <div className='card-body'>
              <form onSubmit={InsertProduct} enctype="multipart/form-data">
              <div className="form-group">
                <label>Name</label>
                <input type="text" onChange={handleInput} name="name" value={Input.name} id="" />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" onChange={handleInput} value={Input.price}  name="price" id="" />
              </div>
           
              <div className="form-group">
                <label>Description</label>
                <input type="text" onChange={handleInput} value={Input.description} name="description" id="" />
              </div>
              <div className="form-group">
                <label>image</label>
                <input type="file" name="image" onChange={handleImage}/>
              </div>
           
              <button>Insert</button>
              </form>
            </div>
        </div>

        </div>
       
    </div>
  )
}

export default AddProduct