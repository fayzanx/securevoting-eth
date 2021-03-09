import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

import LoginForm from '../components/form/Login'

function Login() {
    return (
        <div className="page-login">
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
