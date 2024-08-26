import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavMovies } from "./fav-movies";

export const ProfileView = ({ user, token, movies, onFavouriteToggle }) => {
    const [userData, setUserData] = useState(user); // State to store user data
    const [loading, setLoading] = useState(false); // State to manage loading
    const [error, setError] = useState(""); // State to manage errors

    useEffect(() => {
        if (!user) {
            setError("User not found"); // Handle case where user is null
            return;
          }

        // Function to fetch user data (of the logged in user)
        const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://movie-nest-app-630a7e8ce836.herokuapp.com/users/${user.Username}`, {
                headers: { Authorization: `Bearer ${token}`}
            });
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
    }, [user, token]); //Re-fetch data when user.Username changes to avoid HTTP request error

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
                            <h4>My Profile</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h6>Username: {userData.Username}</h6>
                            <h6>Email: {userData.Email}</h6>
                        </Col>
                    </Row>
                    <FavMovies 
                        user={userData} 
                        movies={movies} 
                        token={token}
                        onFavouriteToggle={onFavouriteToggle}/>
                </Col>
            </Row>
            <Row>
                <Link to={`/profile/update`}> 
                    <Button variant="primary">Edit</Button>
                </Link>
            </Row>
        </Container>
    );
};
