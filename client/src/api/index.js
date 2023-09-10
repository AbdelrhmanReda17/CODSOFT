import axios from 'axios';
const API = axios.create({baseURL : 'http://localhost:5000/' })
// API.interceptors.request.use((req)=>{
//     if(localStorage.getItem('profile')){
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
//     }
//     return req;
// })

export const fetchFeatured = () => API.get(`/products/featured`);
export const fetchMen = (page , sort)  => API.get(`/products/men/${sort}?page=${page}`);
export const fetchWomen = (page , sort) => API.get(`/products/women/${sort}?page=${page}`);
export const getProduct = (id) => API.get(`/products/${id}`);
export const getProductsBySearch = (page,text) => API.get(`/products/search?search=${text}&page=${page}`);
export const getProductsByCategory = (page,type,category) => API.get(`/products/${type}/category/${category}?page=${page}`);
export const getProductsByPrice = (page,type,price) => API.get(`/products/${type}/price/${price}?page=${page}`);
export const createComment = (id , data) => API.post(`/products/${id}` , data);


export const addItemToCart = (id , data) => API.post(`/auth/addCart/${id}` , data);
export const signIn = (formData) => API.post(`/auth/signin/` , formData);
export const signUp = (formData) => API.post(`/auth/signup/` , formData);
