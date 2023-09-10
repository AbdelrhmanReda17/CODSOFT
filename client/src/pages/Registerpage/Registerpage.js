import React, { useState } from 'react';
import { Typography, TextField, Paper, Button, Grid, Link ,Alert , AlertTitle} from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import './Registerpage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/auth';

const Registerpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const FormErrors = useSelector((state) => state.auth.errors);

  // Form Schema
  const schema = yup.object().shape({
    password: yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    email: yup.string().required("You must add an email").email("Invalid email format"),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    fullName: yup.string().required("You must add a Full name").matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, 'Please enter valid Full Name').max(40, 'Full name must be at most 40 charachters').min(3 , 'Full name must be at least 3 charachters'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(signup(data , navigate));
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
              style={{ cursor: 'pointer' }}
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
              Create your account
            </Typography>
            <Typography variant="h6" className="mb-3 text text-center">
              Do you have an account? <Link href='/login' underline='none'> Sign in now </Link>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column justify-content-center align-items-center'>
            {errors.email || errors.fullName || errors.password || errors.passwordConfirmation || FormErrors ? (
              <Alert severity="error" className='mb-3 w-75'>
                <AlertTitle>Error</AlertTitle>
                {errors.email?.message || errors.fullName?.message || errors.password?.message || errors.passwordConfirmation?.message || FormErrors}
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
                id="filled-FullName-static"
                label="Full Name"
                fullWidth
                variant="filled"
                className='mb-3 w-75'
                value={fullName}
                autoComplete='fullName'
                {...register("fullName")}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                id="filled-Password-static"
                label="Password"
                fullWidth
                variant="filled"
                className='mb-3 w-75'
                type="password"
                value={password}
                autoComplete='new-password' // Changed to 'new-password' for security
                {...register("password")}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id="filled-PasswordConfirmation-static"
                label="Password Confirmation"
                fullWidth
                variant="filled"
                className='mb-3 w-75'
                type="password"
                autoComplete='new-password' // Changed to 'new-password' for security
                value={passwordConfirmation}
                {...register("passwordConfirmation")}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mb-3 w-75"
                fullWidth
              >
                Sign Up
              </Button>
              <Typography className='text-2'> By signing up </Typography>
              <Typography className='text-2'> you agree to the <Link href='https://www.lightspeedhq.com/legal/lightspeed-service-agreement/' underline='none'> Terms of Service </Link  >  and  <Link href='https://www.lightspeedhq.com/legal/privacy-policy/' underline='none'>Privacy Policy</Link>. </Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Registerpage;
