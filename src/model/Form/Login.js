import React from 'react'

import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import {Container, Row, Col, Alert, Form, Button} from 'react-bootstrap'

function Login() {
    return (
        <div className="app-form-login">
            <Alert variant="primary">Proctor login required to proceed</Alert>
            <Form>
                <Form.Group controlId="loginCnic">
                    <Form.Label>CNIC</Form.Label>
                    <Form.Control type="text" pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}" placeholder="12345-1234567-8 (without dashes)" />
                </Form.Group>
                <Form.Group controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button type="submit" value="login" className="mb-2 w-100">Login</Button>
                <Button type="submit" value="register" className="w-100" variant="danger">Register</Button>
            </Form>
        </div>
    )
}

export default Login
