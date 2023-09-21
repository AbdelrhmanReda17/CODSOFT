import React, { useEffect } from 'react'
import { Formik } from 'formik';
import * as yup from "yup";
import AuthForm from '../AuthForm/AuthForm';
import Notification from '../Notification/Notification';
import Snackbar from '@mui/material/Snackbar';
import { useModal } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { signup , signin } from '../../store/authAction';
import { useNavigate  } from 'react-router-dom';

const Login = ({type}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading , error  } = useSelector((state) => state.appReducer);
    const [notificationOpen , handleOpen , handleClose] = useModal();
    const schema = yup.object().shape({        
        name: yup.string(),
        email: yup.string().required("You must add an email").email("Invalid email format"),
        password: yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.'),
        confirmPassword: yup.string()
    });

    if (type !== "login") {
        schema.fields.name = schema.fields.name.required('You must add a name').min(3, 'Name is too short - should be 3 chars minimum.')
        schema.fields.confirmPassword = schema.fields.confirmPassword.oneOf([yup.ref('password'), null], 'Passwords must match')
    }

    const onSubmit = (data) => {
      if (type === "login") {
         dispatch(signin(data , navigate));
      }else{
         dispatch(signup(data , navigate));
      }
      handleOpen();
    };
  
  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={onSubmit}
        enableReinitialize
      >
      {({ errors, touched }) => (
            <AuthForm type={type} errors={errors} touched={touched} />
        )}
      </Formik>
      {
        (!isLoading || error) &&
            <Notification notificationOpen={notificationOpen} handleClose={handleClose} type={type} error={error}/>
      }
    </>
  )
}

export default Login