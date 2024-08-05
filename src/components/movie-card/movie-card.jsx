import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onClick }) => {
    return (
        <Card className="h-100" onClick={() => { onClick(movie); }}>
            <Card.Img variant="top" src={movie.imagePath} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <div className="mt-auto text-muted text-end">{movie.genre.name}</div>
            </Card.Body>
        </Card>
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
    }).isRequired,
    onClick: PropTypes.func.isRequired
};