import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onClick }) => {
    return (
        <div
        onClick={() => {
            onClick(movie);
        }}>
            {movie.title}
        </div>
    );
};

// Define Prop Types for Movie Card
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imagePath: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string
        }),
        director: PropTypes.shape({
            name: PropTypes.string,
            bio: PropTypes.string,
            birth: PropTypes.string,
            death: PropTypes.string
        })
    }).isRequired,
    onClick: PropTypes.func.isRequired
};