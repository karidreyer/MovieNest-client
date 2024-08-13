import React, { useState, useEffect } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

export const ProfileView = ({ user }) => {
    const [userData, setUserData] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        if (!user) {
            setError("User not found"); // Handle case where user is null
            setLoading(false);
            return;
          }

        // Function to fetch user data
        const fetchUser = async () => {
        try {
            const response = await fetch(`https://movie-nest-app-630a7e8ce836.herokuapp.com/users`);
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data); // Set user data to state
        } catch (err) {
            setError(err.message); // Set error message
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
        };

        fetchUser();
    }, [user]);

    // Display loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error message if there was an error
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Display user profile information
    return (
        <Container fluid className="mt-5">
            <Row>
                <Col md={8} className="pr-md-5">
                    <Row>
                        <Col>
                            <h2>{userData.Username}</h2>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end text-muted">
                        <Col md={6} className="text-md-end">
                            <h6>Email: {userData.Email}</h6>
                            <h6>Birthday: {userData?.Birthday}</h6>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Link to={`/`} className="p-0">Edit Profile Information</Link>
        </Container>
    );
};
