import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {

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
            <Button variant="link" onClick={onBackClick}>Back</Button>
        </Container>
    );
};

// Define Prop Types for Movie View
MovieView.propTypes = {
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
    onBackClick: PropTypes.func.isRequired
};