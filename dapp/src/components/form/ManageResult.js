import React from 'react'
import { Alert, Form, Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

function ManageResult(props) {
    const { register, handleSubmit, errors } = useForm()

    const constituencies = useSelector((state) => state.constituencies)

    return (
        <div className="form-manage-result">
            <Alert variant={(errors.cnic || errors.const) ? "danger" : "primary"}>
                <div><b>Manage: View Result</b></div>
                {errors.constituency && <ul><li>{errors.constituency.message}</li></ul>}
            </Alert>

            <Form onSubmit={handleSubmit(props.onComplete)}>
                <Form.Group controlId="mvrConst">
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

                <Button type="submit" value="login" className="mb-2 w-100" size="lg" disabled={props.loading}>
                    {!props.loading && 'View Detailed Result'}
                    {props.loading && <Spinner animation="border" as="span" />}
                </Button>
            </Form>
        </div>
    )
}

export default ManageResult
