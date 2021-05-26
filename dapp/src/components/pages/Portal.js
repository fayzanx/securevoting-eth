import React, { useState, useEffect } from 'react'
import { Col, Row, Card, ListGroup, ListGroupItem, Image, Table, Button, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PageTitle from '../text/Title'
import './Portal.css'
import ImgPlaceholderUser from '../../assets/img/placeholder-user.png'

function Portal(props) {
    const [candidateDetails, setCandidateDetails] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const parties = useSelector((state) => state.party)
    const partyLoading = useSelector((state) => state.loading['PARTY_GET_ALL'])

    const processVote = ( id ) => {
        console.log({ id })
    }

    useEffect(() => {
        let mounted = true
        if (props.loggedIn && props.contract != null && !partyLoading && dataLoading ) {
            props.contract.getConstituencyCandidates(1052).then((_cnics) => {
                if (mounted) {
                    if (_cnics.length < 1) return alert('ERROR: No Candidate Data Exists')
                    _cnics = _cnics.map((el) => el.toString())

                    let candidatesArray = []
                    Promise.all(_cnics.map((el, id) => props.contract.getCandidateDetails(el)))

                        .then((_candidates) => _candidates.forEach(
                            (_candidate, id) => candidatesArray.push({
                                cnic: _cnics[id],
                                name: _candidate[0],
                                partyId: Number(_candidate[1].toString()),
                                partyInfo: parties.find((_party) => _party.id === Number(_candidate[1].toString()))
                            })))

                        .then(() => {
                            setCandidateDetails(candidatesArray)
                            console.log('candidateDetails', candidatesArray)
                        })
                        
                        .then(() => {
                            setDataLoading(false)
                        })
                }
            }).catch((err) => alert('ERROR! ' + err.message))
        }

        return () => mounted = false
    }, [props.loggedIn, props.contract, partyLoading, dataLoading, parties])

    const renderCandidateRow = (candidate, index) => {    
        return (
            <tr key={candidate.cnic}>
                <td>{index + 1}</td>
                <td>
                    <b>{candidate.name}</b><br />
                    {candidate.cnic}
                </td>
                <td>
                    <b>{candidate.partyInfo.abbreviation}</b><br />
                    {candidate.partyInfo.name}
                </td>
                <td>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>{candidate.partyInfo.symbolName}</Tooltip>}>
                        <Image src={candidate.partyInfo.symbol} fluid />
                    </OverlayTrigger>
                </td>
                <td><Button onClick={(e)=>processVote(candidate.cnic)} variant="success" size="md">VOTE</Button></td>
            </tr>
        )
    }

    return (
        <div className="page-portal">
            { !props.loggedIn && <Redirect to="/account/login" />}
            <Row>
                <Col md="8" sm="12">
                    <PageTitle title="VOTING AREA" subtitle="Candidate details will appear here" />
                    <p>Account Address: {props.account} <br />
                    Constituency: ID-1<br />
                    Total Candidates: {!dataLoading && candidateDetails.length}</p>
                    <Table bordered striped hover className="portal-candidates">
                        <thead>
                            <tr>
                                <th>#</th>{/*<th>CNIC</th>*/}<th>Name</th><th>Party</th><th>Symbol</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { dataLoading
                                ? <tr><td colSpan="6" className="text-center"><Spinner animation="border" /></td></tr>
                                : candidateDetails.map(renderCandidateRow)
                            }
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