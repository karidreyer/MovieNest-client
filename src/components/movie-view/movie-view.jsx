import { Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

    return (
        <Container fluid className="mt-5">
            <Row>
                <Col md={8} className="pr-md-5">
                    <Row>
                        <Col>
                            <h2>{movie.title}</h2>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end text-muted">
                        <Col md={6}>
                            <h4>{movie.director.name}</h4>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <h6>{movie.genre.name}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-3">
                            <p>{movie.description}</p>
                        </Col>
                    </Row>
                </Col>
                <Col md={4} className="pl-md-5">
                    <Image src={movie.imagePath} fluid />
                </Col>
            </Row>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </Container>
    );
};

// Define Prop Types for Movie View
MovieView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
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
        })
    ).isRequired
};