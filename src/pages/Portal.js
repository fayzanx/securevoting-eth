import React, { Component } from 'react'
import { Col, Row, Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import PageTitle from '../components/text/Title'
import './Portal.css'
import ImgPlaceholderUser from '../assets/img/placeholder-user.png'

class Portal extends Component {
    constructor( props ){
        super( props )
        this.getCandidatesList(1)
    }
    
    async getCandidatesList(c){
        this.props.contract.getConstituencyCandidates(c).then((res)=>{
            let array = res;
            console.log('array[0]', array[0]);
    
            console.log('array[0].val', array[0].toString());
            console.log('array', array);
        })
    }

    render() {
        return (
            <div className="page-portal">
                { !this.props.loggedIn && <Redirect to="/account/login" />}
                <Row>
                    <Col md="8" sm="12">
                        <PageTitle title="VOTING AREA" subtitle="Candidate details will appear here" />
                        <p>Account Address: {this.props.account}</p>
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
}
export default Portal
