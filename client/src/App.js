import React, { useEffect } from 'react';
import './master.css'
import {Main , Auth} from './pages';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";


function App() {
  var user = JSON.parse(localStorage.getItem("auth"));
  console.log(user);
  useEffect(() => {
    user = JSON.parse(localStorage.getItem("auth"));
  }, [Navigate]);
  

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={user ? <Main/> : <Navigate to='/login' />} />
          <Route path="/login" exact element={ user ? <Navigate to='/'/> : <Auth type={'login'}/> } />
          <Route path="/register" exact element={user ? <Navigate to='/'/> : <Auth type={'register'}/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

