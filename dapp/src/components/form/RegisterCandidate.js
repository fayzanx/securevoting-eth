import React from 'react'
import { Alert, Form, Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

function RegisterCandidate(props) {
    const { register, handleSubmit, errors } = useForm();

    const constituencies = useSelector((state) => state.constituency)
    const parties = useSelector((state) => state.party)
    // console.log({ constituencies })
    // console.log({ parties })

    const onSubmitCallback = (data) => {
        console.log('onSubmitCallback', data)
        props.onRegister(data)
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
                    <Form.Control name="cnic" type="text" placeholder="12345-1234567-8" ref={register({
                        required: "CNIC is required",
                        pattern: { value: /([0-9]{5}-[0-9]{7}-[0-9]{1})/, message: "CNIC format invalid" }
                    })} />
                </Form.Group>

                <Form.Group controlId="mrcName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="M.A. Jinnah" ref={register({
                        required: "Name is required",
                        pattern: { value: /([a-zA-Z]{5,})/, message: "Name format invalid" }
                    })} />
                </Form.Group>

                <Form.Group controlId="mrcConst">
                    <Form.Label>Constituency</Form.Label>
                    <Form.Control as="select" name="constituency" ref={register({
                        required: "Constituency info is required",
                        min: { value: 100, message: "Constituency selection invalid" }
                    })}>
                        <option value={-1} defaultValue>Select</option>
                        {constituencies.map((c, i) => (
                            <option key={i} value={c.id}>
                                {`${c.name} - ${c.city}`}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="mrcParty">
                    <Form.Label>Party</Form.Label>
                    <Form.Control as="select" name="party" ref={register({
                        required: "Party info is required",
                        min: { value: 100, message: "Party selection invalid" }
                    })}>
                        <option value={-1} defaultValue>Select</option>
                        {parties.map((p, i) => (
                            <option key={i} value={p.id}>
                                {`${p.abbreviation} - ${p.name} - [ ${p.symbolName} ]`}
                            </option>
                        ))}
                    </Form.Control>
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
