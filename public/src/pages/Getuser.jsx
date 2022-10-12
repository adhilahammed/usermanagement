import React from 'react'
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// async function deleteUser(id){
//   await axios.delete(`http://localhost:4000/admin/deleteUser/${id}`)
  
// }
// async function blockUser(id){
//   await axios.put(`http://localhost:4000/admin/blockUser/${id}`)
// }
// async function unBlockUser(id){
//   await axios.put(`http://localhost:4000/admin/unBlockUser/${id}`)
// }
function Getuser() {

  const [user, setUser] = useState([])
  const navigate=useNavigate()
  const [cookies,setCookie,removeCookie]=useCookies([])
 

  useEffect(() => {
   
    fetchUsers();
    verifyUser()
  }, [])
  
  const fetchUsers = async () => {
    const { data } = await axios.post("http://localhost:4000/admin/getUser")
    console.log(data);
    setUser(data)
  }

  const deleteUser=async(id)=>{
      
      let result=await fetch(`http://localhost:4000/admin/deleteUser/${id}`,{
        method:'Delete'
      })
      result=await result.json()
      if(result){
        fetchUsers();
      }
  }

  const blockUser=async(id)=>{
    console.log(id);

    let result=await fetch(`http://localhost:4000/admin/blockUser/${id}`,{
      method:'Put'
    })
    result=await result.json()
    if(result){
      fetchUsers();
    }
  }

  const unBlockUser=async(id)=>{
    let result=await fetch(`http://localhost:4000/admin/unBlockUser/${id}`,{
      method:'Put'
    })
    result=await result.json()
    if(result){
      fetchUsers();
    }
  } 

  const verifyUser=async()=>{
    if(!cookies.jwt){
      navigate('/admin/adminlogin')
    }else{
      const {data} =await axios.post('http://localhost:4000/admin/',{},
      {withCredentials:true})
      console.log(data);
      if(!data.status){
        removeCookie('jwt')
        navigate('/admin/adminlogin')
      }else toast(`HI ${data.user}`,{theme:'dark'})
      console.log('aaaaaaaaaaaa');  
     
      
    }
  }
  const logOut=()=>{
    try {
      removeCookie('jwt')
     
      navigate('/admin/adminlogin')
    } catch (error) {
      console.log(error);
      
    }
   
   
   

  }

  const searchHandle=async(e)=>{
    console.log(e.target.value);
    let key=e.target.value
    let result=await fetch(`http://localhost:4000/admin/search/${key}`)
    result= await result.json()
    if(result){
      setUser(result)
    }
  }

 

  return (
 <div>
    <h2 className='container'>User Management</h2>
    {/* <button onClick={logOut}>Log Out</button> */}
    <input type='' className='search-product-box' placeholder='Search User'
    onChange={searchHandle}/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 950 }} aria-label="simple table">
        <TableHead>  
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell align="right">EMAIL</TableCell>
            <TableCell align="right">EDIT</TableCell>
            <TableCell align="right">BLOCK</TableCell>
            <TableCell align="right">DELETE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
              <Link to={`/admin/edituser/${row._id}`}><Button>Edit</Button></Link> </TableCell>
              <TableCell align="right">{row.block?(<Button onClick={()=>unBlockUser(row._id)} >UnBlock</Button>):(<Button onClick={()=>blockUser(row._id)}>Block</Button>)}</TableCell>
              <TableCell align="right" ><Button style= {{backgroundColor: "red"}} onClick={()=>deleteUser(row._id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ToastContainer/>
    </div>
  )
}

export default Getuser