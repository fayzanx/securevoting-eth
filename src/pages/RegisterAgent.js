import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import RegisterAgentForm from '../components/form/RegisterAgent'
import PageTitle from '../components/text/Title'

class RegisterAgent extends Component {

    handleRegisterAgent = ( data ) => {
        console.log('handleRegisterAgent', data)
        this.props.contract.registerPollingAgent( data.address, { from: this.props.account }).then((result)=>console.log(result))
    }

    render() {
        return (
            <div className="page-register-agent">
                { !this.props.loggedIn && <Redirect to="/account/login" />}
                <Row>
                    <Col sm="12" className="text-center">
                        <PageTitle title="GOVERNANCE AREA" subtitle="Setup and Manage Elections from here" />
                    </Col>
                    <Col md="6" sm="12" className="evs-center">
                        <RegisterAgentForm onRegister={this.handleRegisterAgent}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default RegisterAgent
