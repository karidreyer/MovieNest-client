import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavMovies = ({ user, movies, token, onFavouriteToggle }) => {
    const [favouriteMovies, setFavouriteMovies] = useState([]); // State to store favorite movies

    useEffect(() => {
        if (user && movies) {
            const favMovies = movies.filter((m) =>
            user.FavouriteMovies.includes(m.id)
        );
        setFavouriteMovies(favMovies);
        }
    }, [user, movies]);

    return (
        <>
            <Row className="mt-4">
                <Col>
                    <h5>Favourite Movies</h5>
                </Col>
            </Row>
            <Row>
                {favouriteMovies.length === 0 ? (
                    <Col>No favourite movies selected.</Col>
                ) : (
                    favouriteMovies.map(movie => (
                        <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <MovieCard 
                                movie={movie}
                                user={user}
                                token={token}
                                onFavouriteToggle={onFavouriteToggle}
                             />
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};