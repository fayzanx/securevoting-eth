import React from 'react'
import {Container, Col, Row, Card, ListGroup, ListGroupItem, Image} from 'react-bootstrap'
import './Portal.css'
import ImgPlaceholderUser from '../assets/img/placeholder-user.png'

function Portal() {
    return (
        <div className="page-portal">
            <Container>
                <Row>
                    <Col md="8" sm="12">
                        <h1 className="display-4">VOTING AREA</h1>
                        <p className="text-muted ml-2">Candidate Infomation will appear here</p>
                    </Col>
                    <Col md="4" sm="12">
                        <Card>
                            {/* <Card.Img className="portal-voter-img" variant="top" src={ImgPlaceholderUser} roundedCircle/> */}
                            <div className="mx-auto mt-1 portal-voter-img">
                                <Image src={ImgPlaceholderUser}/>
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
            </Container>
        </div>
    )
}
export default Portal
