import React from 'react'
import { Alert, Form, Button, Spinner } from 'react-bootstrap'

import { useForm } from 'react-hook-form'

function Login(props) {
    const { register, handleSubmit, errors } = useForm();

    function onSubmitCallback(data) {
        data.cnic = data.cnic.replaceAll('-', '')
        props.handleComplete( data )
    }

    return (
        <div className="form-authenticate">
            <Alert variant={(errors.cnic) ? "danger" : "primary"}>
                <div><b>Fingerprint Authentication</b></div>
                <p>
                    {errors.cnic && errors.cnic.message}
                </p>
            </Alert>
            <Form onSubmit={handleSubmit(onSubmitCallback)}>
                <Form.Group controlId="authCnic">
                    <Form.Label>CNIC</Form.Label>
                    <Form.Control name="cnic" type="text" placeholder="12345-1234567-8" ref={register({
                        required: "CNIC is required",
                        pattern: { value: /([0-9]{5}-[0-9]{7}-[0-9]{1})/, message: "CNIC format invalid" }
                    })} />
                </Form.Group>

                <Button type="submit" value="login" className="mb-2 w-100" size="lg">
                    {!props.loading ? 'Proceed' : <Spinner animation="border" as="span" />}
                </Button>
            </Form>
        </div>
    )
}

export default Login
