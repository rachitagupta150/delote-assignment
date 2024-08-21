import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import './Register.css'; 


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                if (result.status === 201) {
                    alert("Registered successfully! Please Login to proceed.");
                    navigate('/login');
                } else if (result.status === 400 || result.status === 500) {
                    setErrors(result.data.errors || [result.data.reason || "Registration failed"]);
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    setErrors(err.response.data.errors || [err.response.data.reason || "An error occurred. Please try again."]);
                } else {
                    setErrors(["An error occurred. Please try again."]);
                }
            });
    }

    return (
        <div className="register-container">
            <div className="register-box bg-white p-4 rounded">
                <h2 className="mb-1 ">SignUp</h2>
                <form onSubmit={handleSubmit}>
                    {errors.length > 0 && (
                        <div className="alert alert-danger">
                            {errors.map((error, index) => <div key={index}>{error}</div>)}
                        </div>
                    )}
                    <div className="mb-1 text-start">
                        <label htmlFor="exampleInputName" className="form-label">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            id="exampleInputName"
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-1 text-start">
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
                    <div className="mb-1 text-start">
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
                    <button type="submit" className="btn btn-primary w-100">SignUp</button>
                </form>

                <p className="container my-1">Already have an account? <Link to='/login'>Login</Link></p>
                <hr />

                <div className="d-grid gap-2">
                    <button className="btn btn-facebook w-100" type="button">
                        <FaFacebook /> Sign in with Facebook
                    </button>
                    <button className="btn btn-google w-100" type="button">
                        <FaGoogle /> Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
