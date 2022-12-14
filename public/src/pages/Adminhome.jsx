import {useEffect,useState} from 'react'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

export default function Adminhome() {

    const navigate=useNavigate()
  const [cookies,setCookie,removeCookie]=useCookies([])

  
  useEffect(()=>{
   
    const verifyUser=async()=>{
      if(!cookies.jwt){
        navigate('/admin/adminlogin')
      }else{
        const {data} =await axios.post('http://localhost:4000/admin',{},
        {withCredentials:true})
        if(!data.status){
          removeCookie('jwt')
          navigate('/admin/adminlogin')
        }else toast(`HI ${data.user}`,{theme:'dark'})
        
      }
    }
    verifyUser()

  
    
    
  },[cookies,navigate,removeCookie])
  const logOut=()=>{
    removeCookie('jwt')
    navigate('/admin/adminlogin')

  }
 

  return (
    
    <TableContainer component={Paper}>
      <button onClick={logOut}>Log Out</button>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Dessert (100g serving)</TableCell>
          <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat&nbsp;(g)</TableCell>
          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          <TableCell align="right">Protein&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.email}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}
