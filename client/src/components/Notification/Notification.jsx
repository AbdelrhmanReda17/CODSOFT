import React, { useEffect, useState } from 'react';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Alert from '@mui/joy/Alert';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CircularProgress from '@mui/joy/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCountUp } from 'use-count-up';
import LinearProgress from '@mui/joy/LinearProgress';
import ReportIcon from '@mui/icons-material/Report';

const Notification = ({ notificationOpen, handleClose , type = null , error = null}) => {
  const HideDuration = 1500;
  const { value , reset } = useCountUp({
        isCounting: notificationOpen,
        duration: 1.5,
        easing: 'linear',
        start: 0,
        end: 100,
        onComplete: () => ({
            shouldRepeat: false,
            delay: 0,
        }),
  });
  
 const CustomhandleClose = () => {
  handleClose();
  reset();
 }
  // TYPE : LOGIN / REGISTER / CREATED 
  return (
        <Snackbar open={notificationOpen} autoHideDuration={HideDuration} onClose={CustomhandleClose} sx={{ width: 400 }}>
            <Alert
            variant="outlined"
            color = {error ? "danger" : "success"}
            sx={{ width: '100%' }}
            startDecorator=                      
             { type === 'CREATED' ? <CircularProgress  variant="solid" color={error ? "danger" : "success"} determinate value={Number(value)} > <CheckCircleIcon  color={error ? "danger" : "success"} fontSize="medium" /> </CircularProgress> : <CheckCircleIcon  color={error ? "danger" : "success"} fontSize="meduim" />}
                endDecorator={
                    <IconButton variant="plain" size="sm" color={error ? "danger" : "success"}>
                      {error ? 
                        <ReportIcon color='danger'/>
                      :
                        <CloseRoundedIcon color='success' />
                      }
                    </IconButton>
                }
            >
              {error ? 
                error :
                type !== 'login'  ? "Account Created Successfully" : type === 'login' ? "Account Logged Successfully" : "Project Created Successfully"
              }
              {
                type !== 'CREATED' &&
                  <LinearProgress  determinate value={Number(value)}  color={error ? 'danger' : 'primary'} sx={(theme) => ({
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      '--LinearProgress-radius': '0px',
                  })} /> 
              }
            </Alert>        
        </Snackbar>
  )
};

export default Notification;
