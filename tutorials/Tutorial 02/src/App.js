import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './Registration';
import Profile from './Profile';

// patch for the ResizeObserver loop error
window.addEventListener('error', e => {
  if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
    const resizeObserverErrGuid = '800a736d-926d-473d-bc01-35694a97305d';
    if (e.stopImmediatePropagation) {
      e.stopImmediatePropagation();
    }
  }
});

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration setUser={setUser} />} />
        <Route 
          path="/profile" 
          element={user ? <Profile user={user} /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;