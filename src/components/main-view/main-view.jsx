import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavBar } from "../nav-bar/nav-bar"
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-view/profile-update";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    // Function to update User information
    const handleUserUpdate = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Update local storage with the new user data
    };

    // Function to handle toggling a favourite movie
    const onFavouriteToggle = (movieId, isFavourite) => {
        const updatedUser = {
            ...user,
            FavouriteMovies: isFavourite
            ? [...user.FavouriteMovies, movieId]
            : user.FavouriteMovies.filter((id) => id !== movieId)
        };
        handleUserUpdate(updatedUser);
    };

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://movie-nest-app-630a7e8ce836.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}`}
        })
          .then((response) => response.json())
          .then((data) => {
            const moviesFromApi = data.map((movie) => {
              return {
                id: movie._id,
                title: movie.Title,
                description: movie.Description,
                imagePath: movie.ImagePath,
                genre: {
                    name: movie.Genre.Name,
                    description: movie.Genre.Description
                },
                director: {
                    name: movie.Director.Name,
                    bio: movie.Director.Bio,
                    birth: movie.Director.Birth,
                    death: movie.Director.Death
                }
              };
            });
    
            setMovies(moviesFromApi);
          });
      }, [token]);
    
    return (
        <BrowserRouter>
            <NavBar user={user} onLoggedOut={() => { setUser(null); }} />
            <Row>
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Container>
                                        <SignupView />
                                    </Container>
                                )}
                            </>
                        }
                    />

                    <Route 
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Container>
                                        <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
                                    </Container>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            user ? (
                                <ProfileView user={user} token={token} movies={movies}/>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col>
                                        <MovieView movies={movies} />
                                     </Col>
                                )}
                            </>
                        }
                    />

                    <Route 
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Row>
                                        {movies.map((movie) => (
                                            <Col key={movie.title} xs={12} sm={6} md={4} lg={3} className="mb-5">
                                                <MovieCard 
                                                    movie={movie} 
                                                    user={user}
                                                    token={token}
                                                    onFavouriteToggle={onFavouriteToggle}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                )}
                            </>
                        }
                    />

                    <Route 
                        path="/profile/update"
                        element={
                            user ? (
                                <ProfileUpdate user={user} token={token} onUpdate={handleUserUpdate} />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    )
};