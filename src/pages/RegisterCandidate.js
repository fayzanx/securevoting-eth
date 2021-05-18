import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import RegisterCandidateForm from '../components/form/RegisterCandidate'
import PageTitle from '../components/text/Title'

class RegisterCandidate extends Component {

    handleCandidateRegistration = (data) => {
        console.log('handleCandidateRegistration', data)
        this.props.contract.registerCandidate(
            data.cnic, data.name, data.party, data.constituency,
            { from: this.props.account }
        ).then((result)=>console.log(result))
    }

    render() {
        return (
            <div className="page-register-candidate">
                { !this.props.loggedIn && <Redirect to="/account/login" />}
                <Row>
                    <Col sm="12" className="text-center">
                        <PageTitle title="GOVERNANCE AREA" subtitle="Setup and Manage Elections from here" />
                    </Col>
                    <Col md="6" sm="12" className="evs-center">
                        <RegisterCandidateForm onRegister={this.handleCandidateRegistration} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default RegisterCandidate
