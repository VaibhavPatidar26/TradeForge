import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NotFound() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-brand font-mono mb-4">404</p>
      <h1 className="text-2xl font-semibold text-white mb-2">Page not found</h1>
      <p className="text-slate-400 text-sm mb-8">The route you are looking for does not exist.</p>
      <a
        href={isAuthenticated ? '/dashboard' : '/login'}
        className="btn-primary"
      >
        {isAuthenticated ? 'Go to Dashboard' : 'Go to Login'}
      </a>
    </div>
  );
}

export { Navigate };
