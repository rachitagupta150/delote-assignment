import React from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext,AuthProvider } from '../AuthContext';  // Import AuthProvider and AuthContext

function App() {
  return (
    <AuthProvider>
      <div style={{ marginTop: '-3.5rem' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

// A private route component that checks if the user is authenticated
function PrivateRoute({ children }) {
  const { isAuthenticated } = React.useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
