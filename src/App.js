import  './App.css';
import React from 'react';
import Adminlogin from './Adminlogin';
import Dashboard from './Dashboard';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (

   <div className='App'>
     <Routes>
     
     <Route path='/' element={<Adminlogin/>}/>
     <Route path='/dashboard' element={<Dashboard/>}/>
     
     </Routes>
     </div>
  );
}

export default App;
