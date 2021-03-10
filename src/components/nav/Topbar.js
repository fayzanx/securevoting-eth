import React from 'react'
import {Nav, Navbar, NavDropdown, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Topbar.css'

function Topbar( props ) {
    let logActionBtn
    if( props.loggedIn ){
        logActionBtn = <><Navbar.Text className="info-logged-in">
                            Signed in as: <Link to="/account/profile">John Doe</Link>
                        </Navbar.Text>
                        <Link to="/account/logout">
                            <Button variant="danger">Logout</Button>
                        </Link></>
    } else {
        logActionBtn = <Link to="/account/login">
                            <Button variant="info">Login</Button>
                        </Link>
    }
    return (
        <div className="nav-top mb-3">
            <Navbar bg="success" variant="dark" expand="lg" >
                <Navbar.Brand href="#home" ><b className="text-dark">C H A I N </b>EVS v0.1</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/portal" className="nav-link">Voting Portal</Link>
                        <NavDropdown title="More" id="basic-nav-dropdown">
                            <Link to="/portal/page1" className="dropdown-item">Portal Page A</Link>
                            <Link to="/portal/page2" className="dropdown-item">Portal Page B</Link>
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    
                    
                    {logActionBtn}

                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Topbar
