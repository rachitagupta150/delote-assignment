const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const FormDataModel = require('./models/FormData');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://rachitagupta:rachi123@cluster0.pcswu.mongodb.net/")
console.log("db connected");

app.post('/register', 
    [
        // Simplified and clear validation rules
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('A valid email address is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: "Validation failed", 
                errors: errors.array().map(error => error.msg)  // Only return error messages
            });
        }

        const { email } = req.body;
        FormDataModel.findOne({ email })
            .then(user => {
                if (user) {
                    return res.status(400).json({ 
                        message: "Registration failed", 
                        reason: "Email is already registered" 
                    });
                } else {
                    FormDataModel.create(req.body)
                        .then(log_reg_form => res.status(201).json({ 
                            message: "Registration successful", 
                            data: log_reg_form 
                        }))
                        .catch(err => res.status(500).json({ 
                            message: "Registration failed", 
                            reason: "Database error", 
                            error: err 
                        }));
                }
            })
            .catch(err => res.status(500).json({ 
                message: "Registration failed", 
                reason: "Database query error", 
                error: err 
            }));
    }
);

app.post('/login',
    [
        body('email').isEmail().withMessage('A valid email address is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: "Validation failed", 
                errors: errors.array().map(error => error.msg) 
            });
        }

        const { email, password } = req.body;
        FormDataModel.findOne({ email })
            .then(user => {
                if (user) {
                    if (user.password === password) {
                        res.status(200).json("Success");
                    } else {
                        res.status(400).json({ 
                            message: "Login failed", 
                            reason: "Wrong password" 
                        });
                    }
                } else {
                    res.status(404).json({ 
                        message: "Login failed", 
                        reason: "No records found" 
                    });
                }
            })
            .catch(err => res.status(500).json({ 
                message: "Login failed", 
                reason: "Database query error", 
                error: err 
            }));
    }
);

app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});
