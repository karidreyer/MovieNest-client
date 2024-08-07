import React from 'react';
import { Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <Container className="my-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form>
                        <FormControl 
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

SearchBar.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    setSearchQuery: PropTypes.func.isRequired
};