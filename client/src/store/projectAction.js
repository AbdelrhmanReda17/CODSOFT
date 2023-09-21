import * as api from './api';
import { endLoading, startLoading } from './appSlice';
import { addProjects , updateProject as updateCurrentProject } from './projectSlice';

export const createProject = (page,userId,projectData) => {
    return async (dispatch) => {
      dispatch(startLoading());
      await api.createProject(projectData);
      const { data }  = await api.getProjects(page,userId , '' , 'Default');
      if (!data.projects) {
        return;
      }
      dispatch(addProjects(data));
      dispatch(endLoading());
    };
}

export const getProjects = (page , userId , searchText = null, filterBy = null) => {
    return async (dispatch) => {
      dispatch(startLoading());
      const { data }  = await api.getProjects(page,userId , searchText , filterBy);
      console.log(data);
      if (!data.projects) {
        return;
      }
      dispatch(addProjects(data));
      dispatch(endLoading());
    };
}

export const updateProject = (project) => {
  return async (dispatch) => {
    const { data }  = await api.updateProjects( project );

    if (!data.project) {
      return;
    }
    dispatch(updateCurrentProject(data));
  };
}

export const deleteProject = (page,userId,project) => {
  return async (dispatch) => {
    await api.deleteProjects( project );
    const { data }  = await api.getProjects(page,userId , '' , 'Default');
    if (!data.projects) {
      return;
    }
    dispatch(addProjects(data));
  };
}