import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';  // Import AuthContext
import { FaGoogle, FaFacebook } from 'react-icons/fa';  // Import FontAwesome icons
import './Login.css';  
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext); // Get the setIsAuthenticated function

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                if (result.status === 200 && result.data === "Success") {
                    localStorage.setItem('authToken', 'your-token-value'); // Set a token after successful login
                    setIsAuthenticated(true); // Update the authentication status
                    alert('Login successful!');
                    navigate('/home');
                } else if (result.status === 400 || result.status === 404) {
                    setErrors([result.data.reason || "Login failed. Please try again."]);
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    setErrors([err.response.data.reason || "An error occurred. Please try again."]);
                } else {
                    setErrors(["An error occurred. Please try again."]);
                }
            });
    };

    return (
        <div className="login-container">
            <div className="login-box bg-white p-4 rounded">
                <h2 className="mb-3 ">Login</h2>
                <form onSubmit={handleSubmit}>
                    {errors.length > 0 && (
                        <div className="alert alert-danger">
                            {errors.map((error, index) => <div key={index}>{error}</div>)}
                        </div>
                    )}
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            <strong>Email Id</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            id="exampleInputEmail1"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

                <p className="container my-2">Don't have an account? <Link to='/register'>SignUp</Link></p>

                <hr />

                <div className="d-grid gap-2">
                    <button className="btn btn-facebook w-100" type="button">
                        <FaFacebook /> Login with Facebook
                    </button>
                    <button className="btn btn-google w-100" type="button">
                        <FaGoogle /> Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
