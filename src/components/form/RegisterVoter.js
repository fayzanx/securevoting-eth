import React from 'react'
import { Alert, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

function RegisterVoter( props ) {
    const { register, handleSubmit, errors } = useForm();

    function onSubmitCallback( data ) {
        console.log(data)
        props.onRegister( data ) 
    }
    
    return (
        <div className="form-register-voter">
            <Alert variant={(errors.cnic || errors.const) ? "danger" : "primary"}>
                <div><b>Voter Registration</b></div>
                {!(errors.cnic || errors.const) && <span>All fields required</span>}
                <ul>
                    {errors.cnic && <li>{errors.cnic.message}</li>}
                    {errors.constituency && <li>{errors.constituency.message}</li>}
                </ul>
            </Alert>
            <Form onSubmit={handleSubmit(onSubmitCallback)}>
                <Form.Group controlId="mrvCnic">
                    <Form.Label>CNIC</Form.Label>
                    <Form.Control name="cnic" type="text" placeholder="12345-1234567-8" ref={register({ required: "CNIC is required" })} />
                </Form.Group>
                <Form.Group controlId="mrvConst">
                    <Form.Label>Constituency</Form.Label>
                    <Form.Control name="constituency" type="text" placeholder="NA-249" ref={register({ required: "Constituency is required" })} />
                </Form.Group>
                <Button type="submit" value="login" className="mb-2 w-100" size="lg">Register Voter</Button>
            </Form>
        </div>
    )
}

export default RegisterVoter
