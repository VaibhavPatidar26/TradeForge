import React from 'react'
import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './pages/Landing';
import { Route, Routes } from 'react-router'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/layout/MainLayout';


function App() {

   return (
    <Routes>
     //no navbar
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

     //navbar
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      
      </Route>
    </Routes>
    )
}

export default App;