import React from 'react'
import { Alert, Form, Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

function RegisterAgent( props ) {
    const { register, handleSubmit, errors } = useForm();
    
    const constituencies = useSelector(state => state.constituencies)

    function onSubmitCallback( data ) {
        //data.cnic = data.cnic.replaceAll('-','')
        console.log(data)
        props.onRegister( data )
    }
    return (
        <div className="form-register-agent">
            <Alert variant={(errors.address || errors.const || errors.constituency) ? "danger" : "primary"}>
                <div><b>Agent Registration</b></div>
                {!(errors.address || errors.const || errors.constituency) && <span>All fields required</span>}
                <ul>
                    {errors.address && <li>{errors.address.message}</li>}
                    {errors.cnic && <li>{errors.cnic.message}</li>}
                    {errors.constituency && <li>{errors.constituency.message}</li>}
                </ul>
            </Alert>
            <Form onSubmit={handleSubmit(onSubmitCallback)}>
                <Form.Group controlId="mraCnic">
                    <Form.Label>CNIC</Form.Label>
                    <Form.Control name="cnic" type="text" placeholder="12345-1234567-8" disabled={true} ref={register({
                        // required: "CNIC is required",
                        // pattern: { value: /([0-9]{5}-[0-9]{7}-[0-9]{1})/, message: "CNIC format invalid" }
                    })} />
                </Form.Group>

                <Form.Group controlId="mraConst">
                    <Form.Label>Constituency</Form.Label>
                    <Form.Control as="select" name="constituency" disabled={true} ref={register({
                        // required: "Constituency info is required",
                        // min: { value: 100, message: "Constituency selection invalid" }
                    })}>
                        <option value={-1} defaultValue>Select</option>
                        {constituencies.map((c, i) => (
                            <option key={i} value={c.id}>
                                {`${c.name} - ${c.city}`}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="mraAddress">
                    <Form.Label>ETH Address</Form.Label>
                    <Form.Control name="address" type="text" placeholder="0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B" ref={register({ 
                        required: "Agent's Address is required",
                        pattern: {value: /^0x[a-fA-F0-9]{40}$/, message: "Please enter valid ETH address"}
                    })} />
                </Form.Group>
                
                <Button type="submit" value="login" className="mb-2 w-100" size="lg" disabled={props.loading}>
                    {!props.loading && 'Register Agent'}
                    {props.loading && <Spinner animation="border" as="span" />}
                </Button>
            </Form>
        </div>
    )
}

export default RegisterAgent
