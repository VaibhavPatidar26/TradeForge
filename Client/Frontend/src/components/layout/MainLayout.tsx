import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Outlet renders whatever child route is currently active */}
        <Outlet /> 
      </main>
    </>
  );
};

export default MainLayout;