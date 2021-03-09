import React from 'react'
import {Nav, Navbar, NavDropdown, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Topbar.css'

function Topbar() {
    return (
        <div className="nav-top">
            <Navbar bg="success" variant="dark" expand="lg" >
                <Navbar.Brand href="#home">EVS v0.1</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/portal" className="nav-link">Portal</Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <Link to="/portal/page1" className="dropdown-item">Portal Page A</Link>
                            <Link to="/portal/page2" className="dropdown-item">Portal Page B</Link>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Navbar.Text className="info-logged-in">
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                    <Button variant="danger">Logout</Button>
                    
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Topbar
