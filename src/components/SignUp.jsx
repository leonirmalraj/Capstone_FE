import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
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
import { NavLink } from 'react-router-dom';
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
const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("FirstName Required"),
    lastName: Yup.string().required("LastName Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Make Strong password"),
  });

  const handleSignup = async (values) => {
    try {
      setLoading(true);
      const response = await AxiosService.post("/user/signup", values);
      const { message } = response.data;
      console.log(message);
      toast.success(message);
      navigate("/signin");
    } catch (error) {
      console.error(error.response.data);
      const errorMessage =
        error.response.data.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
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
              onSubmit={handleSignup}
            >
              <Form>

                <div className="input-group mb-3" >
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <Field
                    name='firstName'
                    type='text'
                    as={TextField}
                    label='First Name'
                    variant='outlined'
                    className='form-control required'
                  />
                  <ErrorMessage
                    name='firstName'
                    component='div'
                    className='required'
                  />
                </div>
                <div className="input-group mb-3" >
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <Field
                    name='lastName'
                    type='text'
                    as={TextField}
                    label='Last Name'
                    variant='outlined'
                    className='form-control required'
                  />
                  <ErrorMessage
                    name='lastName'
                    component='div'
                    className='required'
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                  <Field
                    name='email'
                    type='text'
                    as={TextField}
                    label='Email'
                    variant='outlined'
                    className='form-control required'
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
                    className='form-control required'
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
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='required'
                  />
                </div>
                <Button
                  color='primary'
                  variant='contained'
                  type='submit'
                  style={{ marginTop: "20px" }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Signup"}
                </Button>
                <p style={{ marginTop: "20px" }}>
                  Already have an account? <Link to='/signin'>Signin</Link>
                </p>

              </Form>
            </Formik>
          </ThemeProvider>
        </div>

      </div>
      </div>
      </>
  );
}

export default SignUp