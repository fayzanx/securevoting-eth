import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

import LoginForm from '../form/Login'

function Login( props ) {
    return (
        <div className="page-login">
                <Row>
                    <Col md="6" sm="12" className="mx-auto">
                        <LoginForm loginUpdate={props.loginUpdate} />
                        { (props.loggedIn) && <Redirect to="/portal" /> }
                    </Col>
                </Row>
        </div>
    )
}

export default Login
