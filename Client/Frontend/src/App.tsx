import React from 'react'
import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './pages/Landing';
import { Route, Routes } from 'react-router'
import Login from './pages/Login';
import SignUp from './pages/SignUP';
function App() {

    return (
        <>
            <div className="h-screen w-full">
                {/* <Navbar /> */}
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />

                </Routes>
            </div>



        </>
    )
}

export default App;