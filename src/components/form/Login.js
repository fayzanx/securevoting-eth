import React from 'react'
import {Alert, Form, Button} from 'react-bootstrap'

import { useForm } from 'react-hook-form'

function Login() {
    const { register, handleSubmit, errors } = useForm();

    function onSubmitCallback(data) {
        console.log(data) //test
    }

    return (
        <div className="form-login">
            <Alert variant={(errors.cnic || errors.password) ? "danger" : "primary"}>
                {!(errors.cnic || errors.password) && <span>Proctor login required to proceed</span>}
                <ul>
                    {errors.cnic && <li>{errors.cnic.message}</li>}
                    {errors.password && <li>{errors.password.message}</li>}
                </ul>
            </Alert>
            <Form onSubmit={handleSubmit(onSubmitCallback)}>
                <Form.Group controlId="loginCnic">
                    <Form.Label>CNIC</Form.Label>
                    <Form.Control name="cnic" type="text" placeholder="12345-1234567-8" ref={register({ required: "CNIC is required" })} />
                </Form.Group>
                <Form.Group controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" ref={register({ required: "Password is required" })} />
                </Form.Group>
                <Button type="submit" value="login" className="mb-2 w-100" size="lg">Login</Button>
                {/* <Button type="submit" value="register" className="w-100" size="lg" variant="danger">Register</Button> */}
            </Form>
        </div>
    )
}

export default Login
