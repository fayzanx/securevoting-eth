import React from 'react'
import { Alert, Form, Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

function RegisterCandidate( props ) {
    const { register, handleSubmit, errors } = useForm();

    function onSubmitCallback( data ) {
        console.log('onSubmitCallback', data)
        props.onRegister( data )
    }
    
    return (
        <div className="form-register-candidate">
            <Alert variant={(errors.cnic || errors.name || errors.const || errors.party) ? "danger" : "primary"}>
                <div><b>Candidate Registration</b></div>
                {!(errors.cnic || errors.name || errors.const || errors.party) && <span>All fields required</span>}
                <ul>
                    {errors.cnic && <li>{errors.cnic.message}</li>}
                    {errors.name && <li>{errors.name.message}</li>}
                    {errors.constituency && <li>{errors.constituency.message}</li>}
                    {errors.party && <li>{errors.party.message}</li>}
                </ul>
            </Alert>
            <Form onSubmit={handleSubmit(onSubmitCallback)}>
                <Form.Group controlId="mrcCnic">
                    <Form.Label>CNIC</Form.Label>
                    <Form.Control name="cnic" type="text" placeholder="12345-1234567-8" ref={register({ required: "CNIC is required" })} />
                </Form.Group>
                <Form.Group controlId="mrcName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="M.A. Jinnah" ref={register({ required: "Name is required" })} />
                </Form.Group>
                <Form.Group controlId="mrcConst">
                    <Form.Label>Constituency</Form.Label>
                    <Form.Control name="constituency" type="text" placeholder="NA-249" ref={register({ required: "Constituency is required" })} />
                </Form.Group>
                <Form.Group controlId="mrcParty">
                    <Form.Label>Party</Form.Label>
                    <Form.Control name="party" type="text" placeholder="Pakistan Muslim League" ref={register({ required: "Party is required" })} />
                </Form.Group>
                <Button type="submit" value="login" className="mb-2 w-100" size="lg" disabled={props.loading}>
                    {!props.loading && 'Register Candidate'}
                    {props.loading && <Spinner animation="border" as="span" />}
                </Button>
            </Form>
        </div>
    )
}

export default RegisterCandidate
