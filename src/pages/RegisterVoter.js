import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import RegisterVoterForm from '../components/form/RegisterVoter'
import TransactionProcessedModal from '../components/modal/TransactionProcessed'
import PageTitle from '../components/text/Title'

class RegisterVoter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            modal: false,
            success: false,
        }
    }

    handleModalClose = () => this.setState({modal: false})
    
    handleRegisterVoter = ( data ) => {
        console.log('handleRegisterVoter', data)
        this.setState({ loading: true })
        this.props.contract.registerVoter( data.cnic, data.constituency, { from: this.props.account } )
        .then((result) => {
            console.log(result)
            this.setState({ modal: true, success: true })
            //not currently handling fails with modal, future proofing
        })
        .catch((err) => {
            alert('ERROR! [register-voter] ' + err.message)
        })
        .then(()=>this.setState({ loading: false }))
    }

    render() {
        return (
            <div className="page-register-voter">
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
                    <Col md="6" sm="12" className="evs-center">
                        <RegisterVoterForm onRegister={this.handleRegisterVoter} loading={this.state.loading}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default RegisterVoter
