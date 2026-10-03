import Landing from './pages/Landing';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VerifyOtp from './pages/VerifyOtp';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/layout/MainLayout';
import { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';


function App() {
  const [popUp, setPopUp] = useState(true);

  return (
    <>
      {/* Global Backend-Down Popup — shows on every page, every reload */}
      {popUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-[#121212]/95 p-6 shadow-2xl shadow-black/80 sm:p-7">
            {/* Close button */}
            <button
              onClick={() => setPopUp(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <AlertCircle size={24} />
              </div>

              <h3 className="text-lg font-semibold text-white">
                Backend Temporarily Paused
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                The backend is currently stopped to prevent high AWS hosting charges. Live market feeds and order placement are temporarily unavailable until resumed for demos.
              </p>

              <button
                onClick={() => setPopUp(false)}
                className="mt-6 w-full rounded-lg bg-zinc-800 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      <Routes>
        {/* no navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;