import axios from 'axios';
const API = axios.create({baseURL : 'http://localhost:5000/' })


export const createProject = (data) => API.post(`/projects/` , data);
export const getProjects = (page,id , searchText = null, filterBy = null) => API.get(`/projects/${id}?page=${page}&searchText=${searchText}&filterBy=${filterBy}`);
export const updateProjects = (project ) => API.post(`/projects/${project._id}` , project);
export const deleteProjects = (project ) => API.delete(`/projects/${project._id}`);
export const signIn = (formData) => API.post(`/auth/signin/` , formData);
export const signUp = (formData) => API.post(`/auth/signup/` , formData);