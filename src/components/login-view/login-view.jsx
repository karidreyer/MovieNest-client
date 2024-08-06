import { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Col, Container, FloatingLabel, Form, Nav, Row } from "react-bootstrap";
import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // This prevents the default behaviour of the form (to reload the entire page)
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://movie-nest-app-630a7e8ce836.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
            <Row className="text-left">
                <Col>
                    <p className="mb-1">Welcome to</p>
                    <h1>Movie Nest</h1>
                </Col>
            </Row>
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                            <Form.Control 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength="3"
                            />
                        </FloatingLabel>
                        
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                <Form.Control 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                        </FloatingLabel>
                        
                        <div className="d-flex justify-content-end mb-3">
                            <Button variant="primary" type="submit">Login</Button>
                        </div>
                    </Form>
                    <Col className="text-end">
                        <Nav.Link to="/signup" className="p-0">Don't have an account?</Nav.Link>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

// Define Prop Types for Login View
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};