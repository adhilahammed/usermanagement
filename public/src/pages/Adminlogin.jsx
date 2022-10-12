import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'


export default function Adminlogin() {
    
    const navigate=useNavigate()
    const [cookies,setCookie,removeCookie]=useCookies([])
    const [values,setValues]=useState({
        email:'',
        password:'',

    })

    const generateError=(err)=>
        toast.error(err,{
            position:'bottom-right'
        })

        useEffect(()=>{
            const verifyUser=()=>{
                if(cookies.jwt){
                  navigate('/admin/')
                }
              
        }
        verifyUser()
    },[])
    

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const {data} =await axios.post('http://localhost:4000/admin/adminlogin',{
                ...values,
            },{
                withCredentials:true
            })
            
            if(data){
                if(data.errors){
               const{email,password}=data.errors;
               if(email) generateError(email)
               else if(password) generateError(password)
                }else{
                   navigate('/admin/')
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className='container'>
        <h2>Admin Account</h2> 
        <form  onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" 
                 name='email'
                 placeholder='Email'
                 onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
                 />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password"
                 name='password'
                 placeholder='Password'
                 onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
                 />
            </div>
            <button type='submit'>Submit</button>
           
        </form>
        <ToastContainer/>
    </div>
  )
}
