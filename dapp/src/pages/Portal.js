import React, { useState, useEffect } from 'react'
import { Col, Row, Card, ListGroup, ListGroupItem, Image, Table, Button, Spinner } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import PageTitle from '../components/text/Title'
import './Portal.css'
import ImgPlaceholderUser from '../assets/img/placeholder-user.png'

function Portal(props) {
    const [candidateDetails, setCandidateDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true
        if (props.loggedIn && props.contract != null && loading) {
            props.contract.getConstituencyCandidates(1).then((_cnics) => {
                if (mounted) {
                    if (_cnics.length < 1) return alert('ERROR: No Candidate Data Exists')
                    _cnics = _cnics.map((el) => el.toString())

                    let candidatesArray = []
                    Promise.all(_cnics.map((el, id) => props.contract.getCandidateDetails(el)))
                        .then((_candidates) => _candidates.forEach(
                            (_candidate, id) => candidatesArray.push({
                                cnic: _cnics[id],
                                name: _candidate[0],
                                party: _candidate[1].toString()
                            })))
                        .then(() => {
                            setCandidateDetails(candidatesArray)
                            // console.log('candidateDetails', candidatesArray)
                            setLoading(false)
                        })
                }
            }).catch((err) => alert('ERROR! ' + err.message))
        }

        return () => mounted = false
    }, [loading, props.contract, props.loggedIn])

    const renderCandidateRow = (candidate, index) => {
        return (
            <tr key={candidate.cnic}>
                <td>{index + 1}</td>
                <td>{candidate.cnic}</td>
                <td>{candidate.name}</td>
                <td>{candidate.party}</td>
                <td>SYM</td>
                <td><Button variant="success">VOTE</Button></td>
            </tr>
        )
    }

    return (
        <div className="page-portal">
            { !props.loggedIn && <Redirect to="/account/login" />}
            <Row>
                <Col md="8" sm="12">
                    <PageTitle title="VOTING AREA" subtitle="Candidate details will appear here" />
                    <p>Account Address: {props.account}</p>
                    <p>Constituency: ID-1</p>
                    <p>Total Candidates: {!loading && candidateDetails.length}</p>
                    <Table bordered striped hover>
                        <thead>
                            <tr>
                                <th>#</th><th>CNIC</th><th>Name</th><th>Party</th><th>Symbol</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <tr><td colSpan="6" className="text-center"><Spinner animation="border" /></td></tr>}
                            {!loading && candidateDetails.map(renderCandidateRow)}
                        </tbody>
                    </Table>
                </Col>
                <Col md="4" sm="12">
                    <Card>
                        {/* <Card.Img className="portal-voter-img" variant="top" src={ImgPlaceholderUser} roundedCircle/> */}
                        <div className="mx-auto mt-1 portal-voter-img">
                            <Image src={ImgPlaceholderUser} />
                        </div>
                        <Card.Body>
                            <Card.Title><b>Voter Name</b></Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est totam ducimus facere ipsam.
                        </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>CNIC Number</ListGroupItem>
                            <ListGroupItem>CNIC Epiry</ListGroupItem>
                            <ListGroupItem>Gender</ListGroupItem>
                            <ListGroupItem>Father Name</ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <Card.Link href="#">Action 1</Card.Link>
                            <Card.Link href="#">Action 2</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Portal