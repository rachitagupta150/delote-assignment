import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';  // Import AuthContext
import './Home.css';  

const Home = () => {
  const { setIsAuthenticated } = useContext(AuthContext); // Get the setIsAuthenticated function
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the authentication token
    setIsAuthenticated(false); // Update the authentication status
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="home-container d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <h1 className="home-title">Welcome Back!</h1>
      <p className="home-message">You have successfully logged in.</p>
      <button className="btn btn-light my-5 logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
