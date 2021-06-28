import React, { useState, Fragment } from "react";
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import "./Login.css";
import { ValidatorForm } from 'react-material-ui-form-validator'

const Login = ({ clickLoginHandler }) => {

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    const inputChangedHandler = e => {
        const state = loginForm;
        state[e.target.name] = e.target.value;

        setLoginForm({ ...state });
    }

    const onFormSubmitted = e => {
        e.preventDefault();
        clickLoginHandler(loginForm.username, loginForm.password);
    }

    return (
        <Fragment>
            <ValidatorForm className="login-form" onSubmit={onFormSubmitted}>
            
                <FormControl >
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input type= "text" required={true} id="username" name="username" onChange={inputChangedHandler} value={loginForm.username} />
                </FormControl>
                <br />
                <br />
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="password" id="password" required={true} name="password" onChange={inputChangedHandler} value={loginForm.password} />
                </FormControl>
                <br />
                <br />
                <br />
                <Button id="login-btn" variant="contained" color="primary" type="submit">
                    LOGIN
                </Button>
            
            </ValidatorForm>
        </Fragment>





    )
}

export default Login;