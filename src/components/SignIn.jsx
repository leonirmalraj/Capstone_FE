import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import "../assets/css/Login.css";
import '../assets/css/Header.css';
import { NavLink } from 'react-router-dom'; // Import NavLink from React Router

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#f50057",
        },
        error: {
            main: "#f44336",
        },
    },
});

const Signin = () => {
    

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email Required"),
        password: Yup.string()
            .required("Password Required")
            .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Make Strong password"),
    });

    const handleSignin = async (values) => {
        try {
            setLoading(true);
            const response = await AxiosService.post("/user/signin", values);
           
            

            const { message, token, userData } = response.data;
            const user_id = response.data.userData._id;
            
            if (message) {
                console.log("inside If block")
                toast.success(message);
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("userData", JSON.stringify(userData));
                sessionStorage.setItem("id", user_id);
                
                navigate("/dashboard");
            }
        } catch (error) {
            console.log("inside Catch block")

            // toast.error(error.response.data.message, );
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error(error.response.data.message, {
                        // position: toast.POSITION.TOP_CENTER,
                    });
                } else if (error.response.status === 404) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Failed to sign in. Please try again.");
                }
            }
        } finally {
            setLoading(false);
        }
    };
    return (
         <>
            <nav className="navbar">
                <div className="navbar-container">
                    <ul className="navbar-links">
                    </ul>
                </div>
                <ul className="navbar-links">
                    <li><NavLink to="/signin" activeClassName="active">Sign In</NavLink></li>
                    <li><NavLink to="/signup" activeClassName="active">Sign Up</NavLink></li>
                </ul>
            </nav>
        <div className="cus-container">
            <div className="form-box">
                <div className="header-form">
                    <h4 className="text-primary text-center">
                        <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
                    </h4>
                    <div className="image"></div>
                </div>
                <div className="body-form">
                    <ThemeProvider theme={lightTheme}>
                        <CssBaseline />
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSignin}
                        >
                            <Form>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-user"></i>
                                        </span>
                                    </div>

                                    <Field
                                        name='email'
                                        type='text'
                                        as={TextField}
                                        label='Email'
                                        variant='outlined'
                                        className='form-control required'
                                        placeholder="Username"
                                    />
                                    <ErrorMessage name='email' component='div' className='required' />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-lock"></i>
                                        </span>
                                    </div>

                                    <Field
                                        name='password'
                                        type={showPassword ? "text" : "password"}
                                        as={TextField}
                                        label='Password'
                                        variant='outlined'
                                        placeholder="Password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge='end'
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        className='form-control required'
                                    />
                                    <ErrorMessage
                                        name='password'
                                        component='div'
                                        className='required'
                                    />
                                </div>

                                <Button
                                    className="btn btn-secondary btn-block login_btn"
                                    color='primary'
                                    variant='contained'
                                    type='submit'
                                    style={{ marginTop: "20px" }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Signin"}
                                </Button>
                                {/* <button
                            type="button"
                            className="btn btn-secondary btn-block login_btn"
                        >
                            LOGIN
                        </button> */}
                                <div className="message d-flex justify-content-end">
                                    <div className="">
                                        <a href="/forgot-password">Forgot your password</a>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </ThemeProvider>
                    <div className="text-center mt-2">
                        <span className="text-muted d-flex justify-content-end">
                            Don't have account?
                            <a href="/signup" className="text-primary">
                                Register
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            </div>
            </>
    );
};

export default Signin;