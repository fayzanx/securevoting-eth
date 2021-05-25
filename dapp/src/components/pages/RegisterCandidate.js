import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import RegisterCandidateForm from '../form/RegisterCandidate'
import TransactionProcessedModal from '../modal/TransactionProcessed'
import PageTitle from '../text/Title'

class RegisterCandidate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            modal: false,
            success: false,

        }
    }

    handleModalClose = () => this.setState({modal: false})

    handleCandidateRegistration = (data) => {
        console.log('handleCandidateRegistration', data)
        this.setState({ loading: true })
        this.props.contract.registerCandidate( data.cnic, data.name, data.party, data.constituency, { from: this.props.account } )
        .then((result) => {
            console.log(result)
            this.setState({ modal: true, success: true })
            //not currently handling fails with modal, future proofing
        })
        .catch((err) => {
            alert('ERROR! [register-candidate] ' + err.message)
        })
        .then(()=>this.setState({ loading: false }))
    }

    render() {
        return (
            <div className="page-register-candidate">
                { !this.props.loggedIn && <Redirect to="/account/login" />}
                <TransactionProcessedModal
                    show={this.state.modal} 
                    handleHide={this.handleModalClose}
                    success={this.state.success}
                />
                <Row>
                    <Col sm="12" className="text-center">
                        <PageTitle title="GOVERNANCE AREA" subtitle="Setup and Manage Elections from here" />
                    </Col>
                    <Col md="6" sm="12" className="mx-auto">
                        <RegisterCandidateForm onRegister={this.handleCandidateRegistration} loading={this.state.loading} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default RegisterCandidate
