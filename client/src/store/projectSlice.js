import { createSlice } from '@reduxjs/toolkit'

const projectInitialState = {
  name: '',
  startDate: Date.now(),
  endDate: null,
  description: '',
  status: 'In Progress',
};

const initialState = {
  projects: [],
  numberOfProjects: 0, 
  numberOfPages : 0,
  currentPage : 1,
};

export const counterSlice = createSlice({
  name: 'projectsReducer',
  initialState,
  reducers: {
    addProject: (state ,action) => {
      state.projects.push(action.payload)
    },
    addProjects: (state ,action) => {
      state.projects = action.payload.projects
      state.numberOfProjects = action.payload.numberOfProjects
      state.numberOfPages = action.payload.numberOfPages
      state.currentPage = action.payload.currentPage
    },
    removeProject: (state , action) => {
      state.projects.filter(project => project.name !== action.payload.name)
    },
    updateProject: (state, action) => {
      state.projects = state.projects.map(project => project._id === action.payload.project._id  ? action.payload.project : project)
    },
    AddTask: (state, action) => {
      state.projects.map((project) => project._id === action.payload._id ? { ...project, tasks: [...project.tasks, action.payload.task] }  : project );
    },
    updateTask: (state, action) => {
      console.log(action.payload)
      state.projects = state.projects.map((project) =>
        project._id === action.payload.id
          ? {
              ...project,
              tasks: project.tasks.map((task) => {
                return task._id === action.payload.task._id
                  ? action.payload.task
                  : task
              }
              ),
            }
          : project
      );
    },
  },
})

export const { addProject, removeProject, updateProject , AddTask , updateTask , addProjects} = counterSlice.actions

export default counterSlice.reducer