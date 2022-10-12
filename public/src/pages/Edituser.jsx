import React,{useEffect, useState} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'

function Edituser() {
    const navigate=useNavigate()
    const [email,setEmail]=React.useState('')
    const [name,setName]=React.useState('')

    
       

    const params=useParams()
    

    useEffect(()=>{
      getUserDetails()
    },[])

    const  getUserDetails=async()=>{
     
      let result=await fetch(`http://localhost:4000/admin/singleUser/${params.id}`)
      result=await result.json()
      setName(result.name)
      setEmail(result.email)
    }

    const generateError=(err)=>
        toast.error(err,{
            position:'bottom-right'
        })
    

    const handleSubmit=async(e)=>{
        e.preventDefault()
         console.log(email);
         let result=await fetch(`http://localhost:4000/admin/singleUser/${params.id}`,
         {
            method:'Put',
            body:JSON.stringify({name,email}),
            headers:{
                'Content-Type':'Application/json'
            }
         })
         result=await result.json()
    //    console.log(result);
    //    console.log(result.errors);
       
        if(result.errors){
            const{email}=result.errors;
            if(email) generateError(email)
        }else{
            navigate('/admin/')
         }
            
       
    
       
       
    }
  return (
    
    <div className='container'>
        <h2>Update Account</h2> 
        <form onSubmit={(e)=>handleSubmit(e)} >
        <div>
                <label htmlFor="name">name</label>
                <input type="name" 
                 name='name'
                 placeholder='name'
                 value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" 
                 name='email'
                 placeholder='Email'
                 value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
           
            <button type='submit'>Submit</button>
           
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Edituser