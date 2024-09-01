import React, { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ProfileUpdate = ({ user, token, onUpdate }) => {
    const [username, setUsername] = useState(user.Username);
    const [email, setEmail] = useState(user.Email);
    const [password, setPassword] = useState(""); // Do not pre-fill the password
    const [birthday, setBirthday] = useState(user.Birthday);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://movie-nest-app-630a7e8ce836.herokuapp.com/users/${user.Username}`, {
                method: "PUT",
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Username: username,
                    Email: email,
                    Password: password || undefined,
                    Birthday: birthday
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update profile`);
            }

            const updatedUser = await response.json();
            onUpdate(updatedUser); // Assuming `onUpdate` updates the parent component with new user data
            navigate("/profile"); // Redirect back to the profile view
        } catch (err) {
            setError('Error updating profile: ', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`https://movie-nest-app-630a7e8ce836.herokuapp.com/users/${user.Username}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete account');
            }

            // Log the user out after deleting the account
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            onUpdate(null); // Clears the state in the parent component
            navigate('/signup'); // Redirect to the signup page after successful deletion

        } catch (error) {
            console.error('Error deleting account: ', error);
        }
    }

    return (
        <Container fluid className="mt-5">
            <Row>
                <Col md={6}>
                    <h3>Update Profile</h3>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Leave blank to keep the same"
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingBirthday" label="Birthday" className="mb-3">
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </FloatingLabel>

                        <Button variant="primary" type="submit">
                            Update Profile
                        </Button>
                    </Form>
                    <Button
                        variant="link"
                        className="text-danger mt-3"
                        onClick={() => setShowModal(true)}
                    >
                        Delete Account
                    </Button>
                </Col>
            </Row>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete your account? This action is irreversible.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccount}>
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};