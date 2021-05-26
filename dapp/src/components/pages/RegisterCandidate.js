import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import RegisterCandidateForm from '../form/RegisterCandidate'
import TransactionProcessedModal from '../modal/TransactionProcessed'
import PageTitle from '../text/Title'

function RegisterCandidate(props) {
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleModalClose = () => setModal(false)

    const handleRegisterCandidate = (data) => {
        console.log('handleRegisterCandidate', data)
        setLoading(true)
        props.contract.registerCandidate(data.cnic, data.name, data.party, data.constituency, { from: props.account })
            .then((result) => {
                console.log(result)
                setModal(true)
                setSuccess(true)
                //not currently handling fails with modal, future proofing
            })
            .catch((err) => {
                alert('ERROR! [register-candidate] ' + err.message)
            })
            .then(() => setLoading(false))
    }

    return (
        <div className="page-register-agent">
            { !props.loggedIn && <Redirect to="/account/login" />}
            <TransactionProcessedModal
                show={modal}
                handleHide={handleModalClose}
                success={success}
            />
            <Row>
                <Col sm="12" className="text-center">
                    <PageTitle title="GOVERNANCE AREA" subtitle="Setup and Manage Elections from here" />
                </Col>
                <Col md="6" sm="12" className="mx-auto">
                    <RegisterCandidateForm onRegister={handleRegisterCandidate} loading={loading} />
                </Col>
            </Row>
        </div>
    )
}

export default RegisterCandidate
