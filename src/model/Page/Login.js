import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import LoginForm from '../Form/Login'

function Login() {
    return (
        <div className="screen-login">
            <Container>
                <Row>
                    <Col md="5" sm="10" xs="12" className="mx-auto">
                        <LoginForm />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
