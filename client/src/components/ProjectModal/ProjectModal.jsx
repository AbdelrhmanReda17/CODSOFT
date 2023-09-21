import { Box, Divider, Modal } from '@mui/material'
import React from 'react'
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormHelperText from '@mui/joy/FormHelperText';
import { Field , Form } from 'formik';
import Typography from '@mui/joy/Typography';

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

const ProjectModal = ({isOpen , handleClose , errors , touched , values , type = 'CREATE' }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
    <Box sx={{ ...style, width: 500, textAlign: 'center' }}>
      <Typography level='h3' className='mb-2'>
        {type === 'EDIT'? "Edit project" :  values.name.toUpperCase() }
      </Typography>
      <Divider variant='middle' />
      <Form>
        {type === 'EDIT' &&
            <FormControl 
              error={touched.name && errors.name}
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
      }
        <FormControl
          error={touched.description && errors.description}
          className='mt-2 mb-3'
          size='lg'
        >
          <FormLabel>Description</FormLabel>
          <Field name='description' as={Input} placeholder='Description' />
          {touched.description && errors.description && (
            <FormHelperText>
              <InfoOutlinedIcon /> Oops! {errors.description}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          error={touched.endDate && errors.endDate}
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
    </Box>
  </Modal>
  )
}

export default ProjectModal