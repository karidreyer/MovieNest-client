import React from 'react';
import { Heart, HeartFill } from 'react-bootstrap-icons';

export const FavouriteToggle = ({ user, token, movieId, isFavourite, onFavouriteToggle }) => {
    const handleFavouriteToggle = async () => {
        if (!user?.Username) {
            console.error('User data is not available');
            return;
        }
        try {
            const method = isFavourite ? 'DELETE' : 'POST';
            const response = await fetch(`https://movie-nest-app-630a7e8ce836.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to update favourites');
            }

            onFavouriteToggle(movieId, !isFavourite); // Update the parent component's state
        } catch (error) {
            console.error('Error updating favourites: ', error);
        }
    };

    return (
        <span 
            style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px', zIndex: '10' }}
            onClick={handleFavouriteToggle}
        >
            {isFavourite ? <HeartFill color="red" size={24} /> : <Heart color="red" size={24} />}
        </span>
    );
};