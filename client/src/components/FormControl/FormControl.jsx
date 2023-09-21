import React from 'react';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import styles from './FormControl.module.css';
import * as yup from 'yup';
import { Form, Formik, Field } from 'formik';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormHelperText from '@mui/joy/FormHelperText';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { createProject } from '../../store/projectAction';
import { useModal } from '../../hooks';
import AddProjectModal from '../ProjectModal/ProjectModal';
import moment from 'moment';
import Navbar from '../Navbar/Navbar';
import Notification from '../Notification/Notification';

const CustomFormControl = ({ page }) => {
  const user = JSON.parse(localStorage.getItem('auth'));
  const {isLoading} = useSelector((state) => state.appReducer);
  const [notificationIsOpen  , notificationHandleOpen, notificationHandleClose] = useModal();

  const projectInitialState = {
    name: '',
    endDate: '',
    userId: user.result._id,
    description: '',
    status: 'In Progress',
    tasks: [],
  };

  const dispatch = useDispatch();
  const [isOpen, handleOpen, handleClose] = useModal();

  const schema = yup.object().shape({
    description: yup.string().required('No description provided.').min(3, 'Description is too short - should be 3 chars minimum.'),
    name: yup.string().required('You must add a name').min(3, 'Name is too short - should be 3 chars minimum.'),
    endDate: yup.date().required('End date is required').test('is-within-project-date-range', 'Date must be after project start date', function (date) {
      const projectStartDate = Date.now();
      return moment(date).isSameOrAfter(projectStartDate);
    }),
  });

  const handleSubmit = (data, { resetForm }) => {
    data.endDate = new Date(data.endDate).getTime();
    dispatch(createProject(page, user.result._id, data));
    notificationHandleOpen();
    handleClose();
    resetForm();
  };

  return (
    <div className={`w-100 p-4 mt-4 ${styles.textRight}`} >
      <Navbar className=''/>
      <img src="logo.png" alt="Logo" className="img-fluid mx-auto d-block" />
      <Notification notificationOpen={notificationIsOpen} handleClose={notificationHandleClose} type={'CREATED'} error={null} />

      <div className='mx-auto w-50 text-center'>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={schema}
          initialValues={projectInitialState}
          enableReinitialize
        >
          {({ values, errors, touched }) => (
            <Form>
              <FormControl
                error={touched.name && errors.name}
                className='w-100 mb-3'
                required
                size='lg'
                color='primary'
                autoComplete='on'
              >
                <Field
                  as={Input}
                  name='name'
                  type='text'
                  placeholder='Add a new Project'
                  className={styles.input}
                  fullWidth
                  variant='outlined'
                  endDecorator={
                    <Button
                      loading={isLoading}
                      color={errors.name && touched.name ? 'danger' : 'primary' }
                      onClick={() => { !errors.name && touched.name && values.name !== '' && handleOpen() }}
                      variant='soft'
                      className='me-1 ms-1'
                    >
                      <AddIcon />
                    </Button>
                  }
                />
                {touched.name && errors.name && (
                  <FormHelperText>
                    <InfoOutlinedIcon /> Oops! {errors.name}
                  </FormHelperText>
                )}
              </FormControl>
              <AddProjectModal isOpen={isOpen} handleClose={handleClose} errors={errors} touched={touched} values={values} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CustomFormControl;
