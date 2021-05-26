import React from 'react'
import { Alert, Form, Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

function RegisterVoter( props ) {
    const { register, handleSubmit, errors } = useForm();

    const constituencies = useSelector((state) => state.constituency)

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
                    <Form.Control name="cnic" type="text" placeholder="12345-1234567-8" ref={register({
                        required: "CNIC is required",
                        pattern: { value: /([0-9]{5}-[0-9]{7}-[0-9]{1})/, message: "CNIC format invalid" }
                    })} />
                </Form.Group>

                <Form.Group controlId="mrvConst">
                    <Form.Label>Constituency</Form.Label>
                    <Form.Control as="select" name="constituency" ref={register({
                        required: "Constituency info is required",
                        min: {value: 100, message: "Constituency selection invalid"}
                    })}>
                        <option value={-1} defaultValue>Select</option>
                        {constituencies.map((c, i)=>(
                            <option key={i} value={c.id}>
                                {`${c.name} - ${c.city}`}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button type="submit" value="login" className="mb-2 w-100" size="lg" disabled={props.loading}>
                    {!props.loading && 'Register Voter'}
                    {props.loading && <Spinner animation="border" as="span" />}
                </Button>
            </Form>
        </div>
    )
}

export default RegisterVoter
