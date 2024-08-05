import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const NavBar = ({ onLogout }) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Movie Nest</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#profile">Profile</Nav.Link>
                    </Nav>
                    <Nav>
                        <button onClick={onLogout}>Logout</button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

NavBar.propTypes = {
    onLogout: PropTypes.func.isRequired,
};