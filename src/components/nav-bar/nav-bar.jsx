import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const NavBar = ({ onLogout }) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                {/* LINKS  NEED UPDATING HERE */}
                <Navbar.Brand href="http://localhost:1234/">myFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="http://localhost:1234/">Home</Nav.Link>
                        <Nav.Link href="#profile">Profile</Nav.Link>
                    </Nav>
                    <Nav>
                        <Button variant="link" onClick={onLogout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

NavBar.propTypes = {
    onLogout: PropTypes.func.isRequired,
};