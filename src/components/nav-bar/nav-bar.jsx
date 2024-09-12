import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export const NavBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/">
                    movieNest
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <NavLink to="/login" className="nav-link">
                                    Login
                                </NavLink>
                                <NavLink to="/signup" className="nav-link">
                                    Signup
                                </NavLink>
                            </>
                        )}
                        {user && (
                            <>
                                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'fw-bold' : ''}`}>
                                    Home
                                </NavLink>
                                <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'fw-bold' : ''}`}>
                                    Profile
                                </NavLink>
                            </>
                        )}
                    </Nav>
                    {user && (
                        <Nav className="ms-auto">
                            <button 
                                onClick={onLoggedOut} 
                                className="btn btn-link text-primary"
                                style={{ textDecoration: "none" }}
                            >
                                Logout
                            </button>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

NavBar.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
    }),
    onLoggedOut: PropTypes.func.isRequired,
};