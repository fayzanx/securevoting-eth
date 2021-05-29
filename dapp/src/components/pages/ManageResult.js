import React, { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'

import PageTitle from '../text/Title'
import ManageResultForm from '../form/ManageResult'
import CandidateResultTable from '../table/Candidates'

function ManageResult(props) {
    const [constituency, setConstituency] = useState(0)
    const [candidateDetails, setCandidateDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [viewResult, setViewResult] = useState(false)

    const parties = useSelector((state) => state.parties)
    const partyLoading = useSelector((state) => state.loading['PARTY_GET_ALL'])

    useEffect(() => {
        if (props.loggedIn && props.contract && !partyLoading && viewResult && constituency > 100) {

            props.contract.getConstituencyCandidates(constituency).then((_cnics) => {
                if (_cnics.length < 1) return alert('ERROR: No candidate data exists ')
                _cnics = _cnics.map((el) => el.toString())

                let candidatesArray = []
                Promise.all(_cnics.map((el, id) => props.contract.getCandidateResults(el)))

                    .then((_candidates) => _candidates.forEach((_candidate, id) => candidatesArray.push({
                        cnic: _cnics[id],
                        name: _candidate[0],
                        partyId: _candidate[1].toString(),
                        partyInfo: parties.find((_party) => _party.id === Number(_candidate[1].toString())),
                        votes: _candidate[2].toString()
                    })))

                    .then(() => {
                        candidatesArray = (candidatesArray.sort((a,b) => parseInt(b.votes) - parseInt(a.votes)))
                        setCandidateDetails(candidatesArray)
                        console.log('candidateDetails', candidatesArray)
                    })

                    .then(() => {
                        setLoading(false)
                    })
            })

        }
    }, [props.loggedIn, props.contract, constituency, parties, loading, partyLoading, viewResult])

    const handleCompletion = ({ constituency }) => {
        console.log(constituency)

        setViewResult(true)
        setLoading(true)
        setConstituency(constituency)
    }

    return (
        <div className="page-manage-result">
            { !props.loggedIn && <Redirect to="/account/login" />}
            <Row>
                <Col sm="12" className="text-center">
                    <PageTitle title="GOVERNANCE: RESULTS AREA" subtitle="Setup and Manage Elections from here" />
                </Col>

                <Col md={viewResult ? '8' : '6'} sm="12" className={`mx-auto ${loading && 'my-5 text-center'}`}>
                    {!viewResult ? <ManageResultForm loading={loading} onComplete={handleCompletion} />
                        : (loading ? <Spinner animation="border" as="span"/>
                            : <CandidateResultTable tableData={candidateDetails} result={true}/>)}
                </Col>
            </Row>
        </div>
    )
}

export default ManageResult
