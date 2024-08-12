import React from "react";
import PropTypes from 'prop-types';
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movies/${movie.id}`} className="text-decoration-none">
            <Card className="h-100">
                <Card.Img variant="top" src={movie.imagePath} />
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                    <div className="mt-auto text-muted text-end">{movie.genre.name}</div>
                </Card.Body>
            </Card>
        </Link>
    );
};

// Define Prop Types for Movie Card
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imagePath: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            birth: PropTypes.string,
            death: PropTypes.string
        }).isRequired
    }).isRequired
};