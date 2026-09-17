import Landing from './pages/Landing';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VerifyOtp from './pages/VerifyOtp';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/layout/MainLayout';


function App() {

   return (
    <Routes>
     //no navbar
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

     //navbar
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      
      </Route>
    </Routes>
    )
}

export default App;