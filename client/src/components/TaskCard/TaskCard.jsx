import React, { useState } from 'react'
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
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
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import { useDispatch } from 'react-redux';
// import { updateTask } from '../../store/projectSlice';
import moment from 'moment';
import { updateProject } from '../../store/projectAction';
import TaskModal from '../TaskModal/TaskModal';
import { useModal } from '../../hooks';
import Countdown from 'react-countdown';

const TaskCard = ({ id, task , project , projectExpire }) => {
  const [taskIsOpen , taskHandleOpen , taskHandleClose ] = useModal();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const newStatus = e.target.checked ? 'Completed' : 'On Work';
    task = {...task , completed : !task.completed , updatedAt : Date.now() , status : newStatus};
    project = {...project , tasks : project.tasks.map((Oldtask) => Oldtask._id === task._id ?  task : Oldtask)};
    dispatch(updateProject(project))                                      
  }
  const handleDelete = (e) => {
    project = {...project , tasks : project.tasks.filter((Oldtask) => Oldtask._id !== task._id)};
    dispatch(updateProject(project))                                      
  }
  const handleExpire = () => {
    task = {...task , status : 'Expired'};
    project = {...project , tasks : project.tasks.map((Oldtask) => Oldtask._id === task._id ?  task : Oldtask)};
    dispatch(updateProject(project));
  }
  
  const createdAt = moment(task.createdAt);
  const updatedAt = moment(task.updatedAt);
  const daysDifference = createdAt.diff(updatedAt, 'days');

  return (
    <ListItem
    startAction={
      task.status !== 'Expired' && !projectExpire &&
      <Checkbox color='primary' variant="outlined" checked={task.completed} size='lg' onChange={handleChange} />
    }
    endAction={
      !projectExpire && (
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
            >
              <MoreVert />
            </MenuButton>
          <Menu placement="bottom-end">
            {
              task.status !== 'Expired' &&
              <>
                <MenuItem onClick={taskHandleOpen}>
                    <ListItemDecorator>
                      <Edit />
                    </ListItemDecorator>
                    Edit Task
                </MenuItem>
                <ListDivider inset='inset'/>
              </>
            }
              <MenuItem onClick={handleDelete}>
                <ListItemDecorator>
                  <DeleteForever sx={{ color: red[700] }}  />
                </ListItemDecorator>
                Delete
              </MenuItem>
            </Menu>
            <TaskModal isOpen={taskIsOpen} handleClose={taskHandleClose} project={project}  task={task} />
         </Dropdown>
      )
    }
  >
    <ListItemButton
    sx={ {cursor: "revert"} }                    
    selected={task.completed}
    color={ (project.status === 'Completed' ? 'success' :  (project.status === 'Expired'  ) ? "danger" : "primary") }
    >
      <div className='d-flex flex-column'>
              <Typography level="title-lg" color='inherit'> {task.name} </Typography>
              {!task.completed && task.status !== 'Expired' &&  !projectExpire &&
                <Typography variant="body" color="textSecondary">
                    Ends On <Countdown date={new Date(task.endDate) } onComplete={ handleExpire } />
                </Typography>
              }
            {task.completed &&  
              <Typography variant="body" color="textSecondary">
                Completed {daysDifference === 0 ? 'today' : `${daysDifference} day${daysDifference === 1 ? '' : 's'} ago`}
              </Typography>           
             }
            {
             ( projectExpire || task.status ==='Expired')  && !task.completed && 
              <Typography level="body-sm" color='inherit'> Expired ! </Typography>
            }
    </div>
    </ListItemButton>
  </ListItem>
  )
}

export default TaskCard