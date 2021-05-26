import React from 'react'
import {Alert, Form, Button} from 'react-bootstrap'

import { useForm } from 'react-hook-form'

function Login( props ) {
    const { register, handleSubmit, errors } = useForm({defaultValues: { cnic: '12345-0000000-1' }});

    function onSubmitCallback( data ) {
        data.cnic = data.cnic.replaceAll('-','')
        if( data.cnic === "1234500000001" && data.password === "abc" )
            props.loginUpdate( true, data )
    }

    return (
        <div className="form-login">
            <Alert variant={(errors.cnic || errors.password) ? "danger" : "primary"}>
                <b>Supervisor Login</b>
                <div><i>[TEST MODE] cnic: 12345-0000000-1, password: abc</i></div>
                {!(errors.cnic || errors.password) && <span>Proctor login required to proceed</span>}
                <ul>
                    {errors.cnic && <li>{errors.cnic.message}</li>}
                    {errors.password && <li>{errors.password.message}</li>}
                </ul>
            </Alert>
            <Form onSubmit={handleSubmit(onSubmitCallback)}>
                <Form.Group controlId="loginCnic">
                    <Form.Label>CNIC</Form.Label>
                    <Form.Control name="cnic" type="text" placeholder="12345-1234567-8" ref={register({
                        required: "CNIC is required",
                        pattern: { value: /([0-9]{5}-[0-9]{7}-[0-9]{1})/, message: "CNIC format invalid" }
                    })} />
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
