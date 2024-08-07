import { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        // This prevents the default behaviour of the form (to reload the entire page)
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://movie-nest-app-630a7e8ce836.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
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

                        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                            <Form.Control 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingInput" label="Birthday" className="mb-3">
                            <Form.Control 
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </FloatingLabel>
                        
                        <div className="d-flex justify-content-end mb-3">
                            <Button variant="primary" type="submit">Signup</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};