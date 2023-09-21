import React, { useEffect } from 'react'
import styles from './Main.module.css'
import Grid from '@mui/material/Unstable_Grid2';
import { ProjectCard , FormControl , Navbar, ProjectSearch, ProjectFilter} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/projectAction';
import {useLocation, useNavigate} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {Pagination} from '../../components';
import { useSearchAndFilter } from '../../hooks';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: "100%",
  color: theme.palette.text.secondary,
}));


const Main = () => {
  const { projects} = useSelector((state) => state.projectsReducer);
  var user = JSON.parse(localStorage.getItem("auth"));


  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get('page') || 1;  
  const {
    searchText,
    filterOption,
    updateSearchText,
    updateFilterOption,
  } = useSearchAndFilter(page , user.result._id);

  useEffect( ()=> {
    dispatch(getProjects(page,user.result._id , searchText, filterOption));
  },[dispatch , page , user.result._id , searchText , filterOption]);

  return (
    <>
    <div className={`${styles.mainContainer}`}>
        <div className={`h-100 d-flex justify-content-between align-items-center`}>
          <FormControl page={page}/>
        </div>
    </div>
    <div className={styles.taskContainer}>
        <Grid container alignContent={'center'} justifyContent={'center'} alignItems={'center'} className={styles.filterContainer} >
        <Grid item xs={12} md={12} lg={6} alignItems={'center'}>
        <ProjectSearch searchText={searchText} updateSearchText={updateSearchText} />
        </Grid>
        <Grid item xs={12} md={12} lg={6} >
        <ProjectFilter filterOption={filterOption} updateFilterOption={updateFilterOption} />
        </Grid>
        </Grid>      
      <div>
          <Grid container columnSpacing={2} rowSpacing={1} padding={3} className='w-100 h-100' >
            {projects.map((project) => 
                <Grid key={project._id} item xs={12} lg={3} md={6} sm={12} style= {{ height: 'auto' }}>
                    <ProjectCard page={page} project={project}/>
                </Grid>
            )}
          </Grid>
      </div>
        <div className='h-100 w-100 mb-3' >
            <Pagination />
        </div>
    </div>
    </>
  )
}

export default Main
