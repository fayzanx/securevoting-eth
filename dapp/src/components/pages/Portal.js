import React, { useState, useEffect } from 'react'
import { Col, Row, Card, ListGroup, ListGroupItem, Image, Table, Button, Spinner, Tooltip, OverlayTrigger, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import PageTitle from '../text/Title'
import BioAuthFormLogin from '../form/BioAuth/Login'
import { getVoter, resetVoter } from '../../state/actions'

import './Portal.css'
import ImgPlaceholderUser from '../../assets/img/placeholder-user.png'

function Portal(props) {
    const dispatch = useDispatch()

    const [candidateDetails, setCandidateDetails] = useState([])
    const [dataLoading, setDataLoading] = useState(true)
    const [authFormStep, setAuthFormStep] = useState(0)

    const parties = useSelector((state) => state.parties)
    const partyLoading = useSelector((state) => state.loading['PARTY_GET_ALL'])
    const voterLoading = useSelector((state) => state.loading['VOTER_GET'])

    const voter = useSelector((state) => state.voter)

    const voterFromLoginHandler = (data) => {
        dispatch(getVoter(data.cnic))
    }

    const processVote = (id) => {
        if( id !== undefined && voter.cnic !== undefined ){
            setAuthFormStep(10)
            props.contract.vote(voter.cnic, id).then(( res )=>{
                console.log(res)
                dispatch(resetVoter( voter.cnic ))
                setAuthFormStep(1)
            }).catch(( error )=>{
                alert(error.message)
                dispatch(resetVoter( voter.cnic ))
                setAuthFormStep(1)
            })
        }
    }

    useEffect(() => { // data loading from blockchain and database
        let mounted = true
        if (props.loggedIn && props.contract != null && !partyLoading && dataLoading) {
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
                            setAuthFormStep( 1 ) // enable voting
                        })
                }
            }).catch((err) => alert('ERROR! ' + err.message))
        }

        return () => mounted = false
    }, [props.loggedIn, props.contract, partyLoading, dataLoading, parties])


    useEffect(() => { // voting process handling
        if (props.loggedIn) {
            if (voter && voter.fingerprintTemplate !== undefined) {
                if( authFormStep === 1) setAuthFormStep(2)
                if( authFormStep === 2) setTimeout(()=>setAuthFormStep(3), 5000)
            }
        }
    }, [props.loggedIn, voter, authFormStep])

 
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
                <td><Button disabled={authFormStep!==3} onClick={(e) => processVote(candidate.cnic)} variant="success" size="md">VOTE</Button></td>
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
                    Constituency: NA-52 - Islamabad<br />
                    Total Candidates: {!dataLoading && candidateDetails.length}</p>
                    <Table bordered striped hover className="portal-candidates">
                        <thead>
                            <tr>
                                <th>#</th>{/*<th>CNIC</th>*/}<th>Name</th><th>Party</th><th>Symbol</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataLoading
                                ? <tr><td colSpan="6" className="text-center"><Spinner animation="border" /></td></tr>
                                : candidateDetails.map(renderCandidateRow)
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col md="4" sm="12">
                    <Card className="mb-4">
                        <div className="mx-auto my-5 portal-voter-img">
                            {authFormStep === 3 ? <Image src={voter.photo} /> : <Image src={ImgPlaceholderUser} />}
                        </div>
                        <div className={`mx-2 ${authFormStep < 3 ? 'my-5' : ''}`}>
                            {authFormStep === 1 && <BioAuthFormLogin loading={voterLoading} handleComplete={voterFromLoginHandler} />}

                            {authFormStep === 2 && <Alert variant="primary">
                                <div><b>Biometric Authentication</b></div>
                                <p>
                                    Authentication in progress <Spinner animation="border" as="span" size="sm"/>
                                    Place your thumb firmly on the sensor<br/>
                                </p>
                            </Alert>}

                            {authFormStep === 3 && <Alert variant="success">
                                <div><b>Authentication Success</b></div>
                                <p>Voting enabled. Please select candidate of choice</p>
                            </Alert>}

                            {(authFormStep === 10 || authFormStep === 0) && <Alert variant="primary" className="text-center">
                                <Spinner animation="border" as="span" />
                            </Alert>}
                        </div>

                        {authFormStep===3 && <><Card.Body>
                            <Card.Title><b>{voter.fullName}</b><small className="text-muted"> s/o {voter.fatherName}</small></Card.Title>
                        </Card.Body>
                            <Card.Text></Card.Text>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>CNIC Number <small className="text-muted">{voter.cnic}</small></ListGroupItem>
                                <ListGroupItem>CNIC Expiry <small className="text-muted">{new Date(voter.dateExpiry).toDateString()}</small></ListGroupItem>
                                <ListGroupItem>Gender <small className="text-muted">{voter.gender}</small></ListGroupItem>
                            </ListGroup>
                        <Card.Body>
                            
                        </Card.Body></>}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Portal