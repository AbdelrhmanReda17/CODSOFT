import React from 'react'
import FormControl from '@mui/joy/FormControl';
import Button from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Form, Field } from 'formik';
import { useSelector } from 'react-redux';

const AuthForm = ({type , errors , touched  }) => {
  const { isLoading  } = useSelector((state) => state.appReducer);
  return (
    <Form className='d-flex flex-column justify-content-center align-items-center'>
    {type !== 'login' &&
        <FormControl className='mb-3 w-50' error={touched.name && errors.name}>
        <FormLabel>Name</FormLabel>
        <Field as={Input} placeholder="Name" name='name' type="name" />
        {touched.name && errors.name && (
            <FormHelperText>
            <InfoOutlined /> Oops! {errors.name}
            </FormHelperText>
        )}
        </FormControl>
    }
    <FormControl className='mb-3 w-50' error={touched.email && errors.email}>
      <FormLabel>Email</FormLabel>
      <Field as={Input} placeholder="Email" name='email' type="email" />
      {touched.email && errors.email && (
        <FormHelperText>
          <InfoOutlined /> Oops! {errors.email}
        </FormHelperText>
      )}
    </FormControl>
    <FormControl className='mb-3 w-50' error={touched.password && errors.password}>
      <FormLabel>Password</FormLabel>
      <Field as={Input} placeholder="Password" name='password' type="password" />
      {touched.password && errors.password && (
        <FormHelperText>
          <InfoOutlined /> Oops! {errors.password}
        </FormHelperText>
      )}
    </FormControl>
    {type !== 'login' &&
        <FormControl className='mb-3 w-50' error={touched.confirmPassword && errors.confirmPassword}>
        <FormLabel>Confirm Password</FormLabel>
        <Field as={Input} placeholder="Confirm Password" name='confirmPassword' type="password" />
        {touched.confirmPassword && errors.confirmPassword && (
            <FormHelperText>
            <InfoOutlined /> Oops! {errors.confirmPassword}
            </FormHelperText>
        )}
        </FormControl>
    }
    <Link color="primary" underline="hover" variant="plain" href='/register' className="mb-3">
      Forgot your password?
    </Link>
    <Button type="submit" variant="solid" color="primary" className="mb-3 w-50"  fullWidth>
      Sign in
    </Button>
  </Form>
  )
}

export default AuthForm