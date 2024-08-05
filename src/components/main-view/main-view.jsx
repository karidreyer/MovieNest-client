import { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavBar } from "../nav-bar/nav-bar"
import { SearchBar } from "../search-bar/search-bar";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };
    
    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <>
                    <NavBar onLogout={handleLogout} />
                    <Col md={8}>
                        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                    </Col>
                </>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    <NavBar onLogout={handleLogout} />
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <Row>
                        {movies.map((movie) => (
                            <Col key={movie.title} xs={12} sm={6} md={4} lg={3} className="mb-5">
                                <MovieCard 
                                    movie={movie} 
                                    onClick={(newSelectedMovie) => {
                                        setSelectedMovie(newSelectedMovie);
                                    }} 
                                />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Row>
    )

};