/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Paper, Grid } from '@mui/material';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { Auth as AuthController } from '../../components';

const Auth = ({type}) => {  
  return (
    <div className="container vh-100">
      <Grid  spacing={3} justifyContent="center" className='w-100 h-100' alignItems="center">
        <Grid item className='text-center'>
            <img
                src="/logo.png"
                alt="RODO LOGO"
                className="img-fluid"
            />
            <br/>
            <img
                src="/startimg.png"
                alt="IMAGE"
                className="img-fluid"
            /> 
        </Grid>
        <Grid item >
          <Paper className="p-3 rounded-4" elevation={0}>
            <Typography level="h4" className="mb-3 text text-center">
              {type=== 'login' ? 'Sign in to your account' : 'Create your account' }
            </Typography>
              {type === 'login' ?
            
              <Typography level="h6" className="mb-3 text text-center">
                  Don&apos;t  have an account? <Link href='/register' disabled={false} underline="hover" variant="plain" > Sign Up </Link>
              </Typography>
              :
                <Typography level="h6" className="mb-3 text text-center">
                  Do you have an account? <Link href='/login' disabled={false} underline="hover" variant="plain" > Sign in now </Link>
                </Typography>
              }
              <AuthController type={type}/>
          </Paper>             
        </Grid>
      </Grid>
    </div>
  );
};

export default Auth;
