import React from 'react'
import {Nav, Navbar, NavDropdown, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Topbar.css'

function Topbar( props ) {
    let logActionBtn
    let userAddress = props.address || '0xdeaddeaddead'
    if( props.loggedIn ){
        logActionBtn = <><Navbar.Text className="info-logged-in">
                            Supervisor: <Link to="/account/profile">John Doe</Link> 
                            { ` (${userAddress.substr(0, 6)}...${userAddress.substr(-4, 4)}) ` }
                        </Navbar.Text>
                        <Link to="/account/logout">
                            <Button variant="danger">Logout</Button>
                        </Link></>
    } else {
        logActionBtn = <Link to="/account/login">
                            <Button variant="info">Supervisor Login</Button>
                        </Link>
    }
    return (
        <div className="nav-top mb-3">
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Navbar.Brand href="#home" ><b className="text-info">C H A I N </b>EVS v0.3</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <NavDropdown title="Governance" id="basic-nav-dropdown">
                            <Link to="/manage/register-voter" className="dropdown-item">Register Voter</Link>
                            <Link to="/manage/register-agent" className="dropdown-item">Register Agent</Link>
                            <Link to="/manage/register-candidate" className="dropdown-item">Register Candidate</Link>
                            <NavDropdown.Divider />
                            <Link to="/manage/result" className="dropdown-item">View Result</Link>
                        </NavDropdown>
                        <Link to="/portal" className="nav-link">Voting Portal</Link>
                        <NavDropdown title="More" id="basic-nav-dropdown">
                            <Link to="/portal/page1" className="dropdown-item">Page A</Link>
                            <Link to="/portal/page2" className="dropdown-item">Page B</Link>
                        </NavDropdown>
                    </Nav>
                    
                    
                    {logActionBtn}

                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Topbar
