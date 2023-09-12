import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Typography} from '@mui/joy';
import ErrorIcon from '@mui/icons-material/Error';
import { red } from '@mui/material/colors';

import './Errorpage.css'
const Errorpage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  useEffect(()=> {
    setOpen(true);
    setTimeout(()=> {
        navigate('/')
        setOpen(false);
    } , 3000)
  })
  return (
    <div className='ErrorContianer d-flex flex-column justify-content-center align-items-center'>
        <ErrorIcon sx={{ color: red[500] , fontSize: 250 }} />
        <Typography sx={{ color: red[500] ,fontSize: 100}} level="h1">PAGE NOT FOUND !</Typography>
        <Typography sx={{ color: red[300]}} level="h1">you will be redirected to home page in few seconds..</Typography>
    </div>
  )
}

export default Errorpage