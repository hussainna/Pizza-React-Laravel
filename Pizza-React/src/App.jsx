import React from "react"
import {BrowserRouter as Router, Switch,Route, Redirect} from 'react-router-dom'
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Home from './components/home/Home'
import axios from "axios"
import Dashboard from './components/layout/Dashboard'
import Single from "./components/single-pizza/Single"
import Cart from "./components/cart/Cart"
import Checkout from "./components/checkout/Checkout"


axios.defaults.withCredentials = true;
axios.defaults.baseURL='http://localhost:8000/api/'
axios.defaults.headers.post['Accept']='application/json'
axios.defaults.headers.post['Content-Type']='application/json'


axios.interceptors.request.use(function(config){
  const token=localStorage.getItem('auth_token')
  config.headers.authorization=token?`Bearer ${token}`:'';
  return config
})

function App() {



  return (
    <div className="App">
     
     <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login'>
                    {localStorage.getItem('auth_token')?<Redirect to='/'/> : <Login/>}
                </Route>

                <Route path='/register'>
                    {localStorage.getItem('auth_token')?<Redirect to='/'/> : <Register/>}
                </Route>

                <Route exact path='/single-pizza/:id' render={({props,location})=>(<Single {...props} />)}/>
                <Route path='/cart' component={Cart}/>
                <Route path='/checkout' component={Checkout}/>

                <Dashboard/>


            </Switch>
        </Router>
     
    </div>
  )
}

export default App
