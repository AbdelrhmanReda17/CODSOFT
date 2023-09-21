import React from 'react'
import Card from '@mui/joy/Card';
import { Divider } from '@mui/material';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import CardContent from '@mui/joy/CardContent';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import { red } from '@mui/material/colors';
import moment from 'moment';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from '../TaskCard/TaskCard';
import { useModal } from '../../hooks';
import { Notification, ProjectModal, TaskModal } from '..';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateProject , deleteProject } from '../../store/projectAction';
import Countdown from 'react-countdown';
import styles from './ProjectCard.module.css'

const ProjectCard = ({page,project}) => {
  const dispatch = useDispatch();
  const [taskIsOpen  , taskHandleOpen, taskHandleClose] = useModal();
  const [projectIsOpen  , projectHandleOpen, projectHandleClose] = useModal();
  var user = JSON.parse(localStorage.getItem("auth"));

  const projectInitialState = {
    name: `${project.name}`,
    endDate: moment(project.endDate).format('YYYY-MM-DD'),
    description: `${project.description}`,
  };

  const schema = yup.object().shape({
    description: yup.string().required('No description provided.').min(3, 'Description is too short - should be 3 chars minimum.'),
    name: yup.string().required('You must add a name').min(3, 'Name is too short - should be 3 chars minimum.'),
    endDate: yup.date().required('End date is required').test('is-within-project-date-range', 'Date must be after project start date', function (date) {
      const projectStartDate = project.createdAt;
      return moment(date).isSameOrAfter(projectStartDate);
    }),
  });

  const handleSubmit = (data) => {
    project = {...project , ...data}
    dispatch(updateProject( project ));
  };
  const handleExpire = () => {
    
    var isCompleted = true;
    if(project.tasks.length > 0){
      project.tasks.map((task) => {
        if(task.completed === false){
          isCompleted = false;
        }
        return true;
      })
    }else{
      isCompleted = false;
    }
    project = {...project , status: isCompleted ? 'Completed' : 'Expired'}
    dispatch(updateProject(project));
  }
  const handleDelete = () => {
    dispatch(deleteProject(page , user.result._id ,project));
  }
  return (
    <Card
            color= { project.status === 'Expired' ? "danger" :  project.status === 'Completed' ? "success" : "primary"}
            orientation="vertical"
              size="lg"
              variant="outlined"
              className='h-100 bg-white shadow-sm border-3 '
            >              
            <div >
              <Typography level="h4" className={styles.text} >
                  {project.name.toUpperCase()}
              </Typography> 
              <Typography level="body-sm" className={`${styles.text} mb-3`}> {moment(project.createdAt).format('MMM D, YYYY')} </Typography>   

               <Chip sx={{ position: 'absolute', top: '1.2rem', right: '3rem' }} color={ project.status === 'Expired' ? "danger" : project.status === 'Completed' ? "success" : "primary"} variant="soft" className='mx-auto' size='md'> 
               <Typography level="body-md" className='text-center'>
                      {project.status === 'Expired' ? "Expired" : project.status}  
                </Typography>
                {
                  project.status === 'In Progress' &&
                    <Typography level="body-xs"  className='text-center' color="textSecondary">
                     <Countdown date={new Date(project.endDate) } onComplete={handleExpire}/>
                  </Typography>
                }
              </Chip> 
              <Typography level="title-lg" > Description </Typography>           
              <Typography level="body-lg" sx={{lineBreak: 'anywhere' , color: 'black' , marginTop: "5px" , marginLeft: 2}}>{project.description}</Typography>

              <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                    sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                  >
                    <MoreVert />
                </MenuButton>
                <Menu placement="bottom-end">
                  {
                    project.status === 'In Progress' &&  
                    <>
                      <MenuItem onClick={projectHandleOpen}>
                        <ListItemDecorator>
                          <Edit /> 
                        </ListItemDecorator>
                        Edit project
                      </MenuItem>
                      <ListDivider inset='inset'/>
                    </>
                  }
                    <MenuItem onClick={handleDelete}>
                      <ListItemDecorator>
                        <DeleteForever sx={{ color: red[700] }}  />
                      </ListItemDecorator>
                      Delete Project
                    </MenuItem>
                  </Menu>
              </Dropdown>
              <Formik
                    onSubmit={handleSubmit}
                    validationSchema={schema}
                    initialValues={projectInitialState}
                  >
                    {({ values, errors, touched }) => {
                      return (
                      <Form>
                        <ProjectModal isOpen={projectIsOpen} handleClose={projectHandleClose} values={values} errors={errors} touched={touched} type={'EDIT'}/>
                      </Form>
                    )}}
                </Formik>              
              </div>   
              <Divider inset='inset' />
              <CardContent>
              <List size='lg' sx={{width: "100%" ,overflow: 'auto', maxHeight: 190,} }>
              <div className="d-flex justify-content-between align-items-center">
                  <Typography level="title-lg" className="w-100">
                    Tasks
                  </Typography>
                  {
                    project.status === 'In Progress' &&
                    <IconButton onClick={taskHandleOpen} >
                      <AddIcon/>
                    </IconButton>
                  }
              
                </div>
                  <TaskModal isOpen={taskIsOpen} handleClose={taskHandleClose} project={project}  />
                  {project.tasks.map((task) => (
                    <div key={task._id}>                  
                      <TaskCard key={task._id} id={project._id} task={task} project={project} projectExpire={project.status !== 'In Progress'} />
                      <ListDivider />
                    </div>
                  ))}
              <Divider inset='inset' />
              </List>              
              </CardContent>              
            </Card>
  )
}

export default ProjectCard