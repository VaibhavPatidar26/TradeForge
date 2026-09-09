import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import AuthNavbar from './AuthNavbar';
import { useAuthStore } from '../../store/authStore';

const MainLayout = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <>
      {token ? <AuthNavbar /> : <Navbar />}
      <main>
        {/* Outlet renders whatever child route is currently active */}
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;