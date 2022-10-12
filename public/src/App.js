


import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Secret from './pages/Secret'
import 'react-toastify/dist/ReactToastify.css'   
import Adminlogin from './pages/Adminlogin'
import Adminhome from './pages/Adminhome'
import Getuser from './pages/Getuser'
import Edituser from './pages/Edituser'




function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/' element={<Secret/>}/>
    <Route exact path='/admin/adminlogin' element={<Adminlogin/>}/>
    {/* <Route exact path='/admin/a' element={<Adminhome/>}/> */}
    <Route exact path='/admin/' element={<Getuser/>}/>
    <Route exact path='/admin/edituser/:id' element={<Edituser/>}/>

   

   
    </Routes>
    </BrowserRouter>
  )
}

export default App