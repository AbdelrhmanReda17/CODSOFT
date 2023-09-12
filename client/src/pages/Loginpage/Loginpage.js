import React, { useState } from 'react';
import { Typography, TextField, Paper, Button, Grid, Link , Alert , AlertTitle} from '@mui/material';
import './Loginpage.css';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/auth';

const LoginPage = () => {  
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const FormErrors = useSelector((state) => state.auth.errors);
    // Form Schema
  const schema = yup.object().shape({
      password: yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.'),
      email: yup.string().required("You must add an email").email("Invalid email format"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(signin(data , navigate));
  };

  return (
    <div className="container vh-100">
      <Grid container spacing={2} justifyContent="center" className='w-100 h-100' alignItems="center">
        <Grid item xs={12} md={6}>
          <div className="text-center">
            <img
              src="/Footer-Logo.png"
              alt="RODO Image"
              className="img-fluid mb-3 "
              onClick={() => navigate('/')}
              style={{cursor: 'pointer'}}
            />
            <Typography variant="h4" className="mb-3" color="initial">
              Buy online with RODO
            </Typography>
            <Typography
              variant="body2"
              className="text-muted mb-3"
              color="initial"
            >
              RODO is a full-featured and affordable ecommerce solution that
              includes web, mobile, and social stores.
            </Typography>
            <img
              src="/startimg.jpg"
              alt="RODO Image"
              className="img-fluid mb-3"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="p-3 rounded-4" elevation={0}>
            <Typography variant="h4" className="mb-3 text text-center">
              Sign in to your account 
            </Typography>
            <Typography variant="h6" className="mb-3 text text-center">
              Don&apos;t  have an account? <Link href='/register' underline='none'> Sign Up </Link>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column justify-content-center align-items-center'>
            {errors.email || errors.password || FormErrors ? (
              <Alert severity="error" className='mb-3 w-75'>
                <AlertTitle>Error</AlertTitle>
                {errors.email?.message || errors.password?.message || FormErrors}
              </Alert>
            ) : null}
              <TextField
                id="filled-Email-static"
                label="Email"
                fullWidth
                variant="filled"
                className='mb-3 w-75'
                value={email}
                autoComplete='email'
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="filled-Password-static"
                label="Password"
                fullWidth
                variant="filled"
                className='mb-3 w-75'
                type="password"
                value={password}
                autoComplete='password'
                {...register("password")}
                onChange={(e) => setPassword(e.target.value)}
              />
            <Link variant="h6" className="mb-3 text-2 mx-auto" href='/register' underline='none'>
                Forgot your password?
            </Link>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mb-3 w-75"
                fullWidth
              >
                Sign in
              </Button>
            </form>
          </Paper>             
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
