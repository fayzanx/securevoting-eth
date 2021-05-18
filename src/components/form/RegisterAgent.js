import React from 'react'
import { Alert, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

function RegisterAgent( props ) {
    const { register, handleSubmit, errors } = useForm();

    function onSubmitCallback( data ) {
        console.log(data)
        props.onRegister( data )
    }
    return (
        <div className="form-register-agent">
            <Alert variant={(errors.address || errors.const) ? "danger" : "primary"}>
                <div><b>Agent Registration</b></div>
                {!(errors.address || errors.const) && <span>All fields required</span>}
                <ul>
                    {errors.address && <li>{errors.address.message}</li>}
                    {errors.cnic && <li>{errors.cnic.message}</li>}
                </ul>
            </Alert>
            <Form onSubmit={handleSubmit(onSubmitCallback)}>
                <Form.Group controlId="mraCnic">
                    <Form.Label>CNIC</Form.Label>
                    {/* <Form.Control name="cnic" type="text" placeholder="12345-6789012-3" ref={register({ required: "CNIC is required" })} disabled={true}/> */}
                    <Form.Control name="cnic" type="text" placeholder="12345-6789012-3" disabled={true}/>
                </Form.Group>
                <Form.Group controlId="mraAddress">
                    <Form.Label>ETH Address</Form.Label>
                    <Form.Control name="address" type="text" placeholder="0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B" ref={register({ required: "Agent's ETH Address is required" })} />
                </Form.Group>
                <Button type="submit" value="login" className="mb-2 w-100" size="lg">Register Agent</Button>
            </Form>
        </div>
    )
}

export default RegisterAgent
