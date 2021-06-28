import React, { useState } from "react";
import { FormLabel } from '@material-ui/core';
import { Fragment } from "react";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import "./Register.css"

const Register = ({ registerUserHandler }) => {

    const [registerUserForm, setregisterUserForm] = useState({
        'first_name': '',
        'last_name': '',
        'email_address': '',
        'password': '',
        'mobile_number': ''
    });

    const [displayUserRegisteredLabel, setDisplayUserRegisteredLabel] = useState(false);

    const inputChangedHandler = e => {
        const state = registerUserForm;
        state[e.target.name] = e.target.value;

        setregisterUserForm({ ...state });
    }

    const onFormSubmitted = async e => {
        e.preventDefault();
        const registered = await registerUserHandler(registerUserForm);
        if (registered) {
            setDisplayUserRegisteredLabel(true);
        }
    }

    return (
        <Fragment>
            <ValidatorForm className="register-form" onSubmit={onFormSubmitted}>
                {/* <FormControl required={true}>
                    <InputLabel htmlFor="first_name">First Name</InputLabel>
                    <Input id="first_name" name="first_name" onChange={inputChangedHandler} value={registerUserForm.InputLabelfirst_name} />
                </FormControl> */}

                <TextValidator
                    className="register-field"
                    id="first_name"
                    label="First Name *"
                    type="text"
                    name="first_name"
                    onChange={inputChangedHandler}
                    value={registerUserForm.first_name}
                    validators={['required']}
                    errorMessages={['required']}
                />

                <br />
                <br />

                <TextValidator
                    className="register-field"
                    id="last_name"
                    label="Last Name *"
                    type="text"
                    name="last_name"
                    onChange={inputChangedHandler}
                    value={registerUserForm.last_name}
                    validators={['required']}
                    errorMessages={['required']}
                />
                {/* <FormControl required={true}>
                    <InputLabel htmlFor="last_name">Last Name</InputLabel>
                    <Input id="last_name" name="last_name" onChange={inputChangedHandler} value={registerUserForm.last_name} />
                </FormControl> */}
                <br />
                <br />

                <TextValidator
                    className="register-field"
                    id="email_address"
                    label="Email *"
                    type="text"
                    name="email_address"
                    onChange={inputChangedHandler}
                    value={registerUserForm.email_address}
                    validators={['required', 'isEmail']}
                    errorMessages={['required', 'Not an email']}
                />
                {/* <FormControl required={true}>
                    <InputLabel htmlFor="email_address">Email</InputLabel>
                    <Input id="email_address" name="email_address" onChange={inputChangedHandler} value={registerUserForm.email_address} />
                </FormControl> */}
                <br />
                <br />

                <TextValidator
                    className="register-field"
                    id="password"
                    label="Password *"
                    type="password"
                    name="password"
                    onChange={inputChangedHandler}
                    value={registerUserForm.password}
                    validators={['required']}
                    errorMessages={['required']}
                />
                {/* <FormControl required={true}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" name="password" onChange={inputChangedHandler} value={registerUserForm.password} />
                </FormControl> */}
                <br />
                <br />

                <TextValidator
                    className="register-field"
                    id="mobile_number"
                    label="Contact No. *"
                    type="text"
                    name="mobile_number"
                    onChange={inputChangedHandler}
                    value={registerUserForm.mobile_number}
                    validators={['required']}
                    errorMessages={['required']}
                />
                {/* <FormControl required={true}>
                    <InputLabel htmlFor="mobile_number">Contact No.</InputLabel>
                    <Input id="mobile_number" name="mobile_number" onChange={inputChangedHandler} value={registerUserForm.mobile_number} />
                </FormControl> */}
                <br />
                <FormLabel className="register-field" hidden={!displayUserRegisteredLabel}>Registration Successful. Please Login!</FormLabel>
                <br />
                <br />
                <Button className="register-field" id="register-btn" variant="contained" color="primary" type="submit">
                    REGISTER
                </Button>
            </ValidatorForm>
        </Fragment>
    );
}

export default Register;