import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Profile from './pages/Profile';
import TimelinePage from './pages/TimelinePage';
import BubblePage from './pages/Bubble';
import Choose from './pages/Choose';
import CustomTimeline from './pages/CustomTimeline';


function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const email = localStorage.getItem('userEmail');
       if (email) {
        fetch(`${process.env.REACT_APP_API}/api/users/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        keepalive: true, 
      });
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
    }
  };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
  
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/bubble" element={<BubblePage />} />
          <Route path="/custom-timeline" element={<CustomTimeline />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
