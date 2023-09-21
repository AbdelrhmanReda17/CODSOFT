import React from 'react';
import { Box, Divider, Modal } from '@mui/material';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormHelperText from '@mui/joy/FormHelperText';
import { Field, Form, Formik } from 'formik';
import Typography from '@mui/joy/Typography';
import * as yup from 'yup';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateProject } from '../../store/projectAction';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};




const TaskModal = ({ isOpen, handleClose , project , task=null }) => {
  
  const schema = yup.object().shape({
    name: yup.string().required('You must add a name').min(3, 'Name is too short - should be 3 chars minimum.'),
    endDate: yup.date()
      .required('End date is required')
      .test('is-within-project-date-range', 'Date must be within project date range', function (date) {
        const projectStartDate = project.createdAt;
        const projectEndDate = project.endDate;
        
        return moment(date).isSameOrAfter(projectStartDate) && moment(date).isSameOrBefore(projectEndDate);
      })
  });
  
  const dispatch = useDispatch();
  const initialValues = {
    name: `${task ? task.name : ''}`,
    endDate: `${task ? moment(task.endDate).format('YYYY-MM-DD') : ''}`,
    status: `In Progress`
  };

  const handleSubmit = (values) => {
    if(task){
      task = {...task ,  ...values };
      project = {...project , tasks : project.tasks.map((Oldtask) => Oldtask._id === task._id ?  task : Oldtask)};
    }else{
      project = { ...project, tasks: [...project.tasks, {...values , completed : false , createdAt : new Date().getTime()}] };
    }
    dispatch(updateProject(project)) 
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={{ ...style, width: 500, textAlign: 'center' }}>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={schema}
          initialValues={initialValues}
        >
          {({ values, errors, touched }) => (
            <>
              <Typography level='h3' className='mb-2'>
                {project.name.toUpperCase()}
              </Typography>
              <Divider variant='middle' />
              <Form>
                <FormControl
                  error={touched.name && Boolean(errors.name)}
                  className='mt-2 mb-3'
                  size='lg'
                >
                  <FormLabel>Name</FormLabel>
                  <Field name='name' as={Input} placeholder='Name' />
                  {touched.name && errors.name && (
                    <FormHelperText>
                      <InfoOutlinedIcon /> Oops! {errors.name}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  error={touched.endDate && Boolean(errors.endDate)}
                  className='mt-3 mb-3'
                  size='lg'
                >
                  <FormLabel>End Date</FormLabel>
                  <Field name='endDate' as={Input} type='date' placeholder='End Date' />
                  {touched.endDate && errors.endDate && (
                    <FormHelperText>
                      <InfoOutlinedIcon /> Oops! {errors.endDate}
                    </FormHelperText>
                  )}
                </FormControl>
                <Divider variant='middle' />
                <Button type='submit' className='mt-3 mb-2' size='lg' fullWidth>
                  Submit
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default TaskModal;
