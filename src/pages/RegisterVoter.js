import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import RegisterVoterForm from '../components/form/RegisterVoter'
import PageTitle from '../components/text/Title'

class RegisterVoter extends Component {
    
    handleRegisterVoter = ( data ) => {
        console.log('handleRegisterVoter', data)
        this.props.contract.registerVoter(
            data.cnic, data.constituency,
            { from: this.props.account }
        ).then((result)=>console.log(result))
    }

    render() {
        return (
            <div className="page-register-voter">
                { !this.props.loggedIn && <Redirect to="/account/login" />}
                <Row>
                    <Col sm="12" className="text-center">
                        <PageTitle title="GOVERNANCE AREA" subtitle="Setup and Manage Elections from here" />
                    </Col>
                    <Col md="6" sm="12" className="evs-center">
                        <RegisterVoterForm onRegister={this.handleRegisterVoter}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default RegisterVoter
