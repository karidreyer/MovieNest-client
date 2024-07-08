import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            _id: ObjectID('665ef9509dddec05c68fcd0c'),
            title: "Zero Dark Thirty",
            description: "A chronicle of the decade-long hunt for al-Qaeda terrorist leader Osama bin Laden after the September 2001 attacks, and his death at the hands of the Navy SEAL Team 6 in May 2011.",
            genre: "Action",
            director: "Kathryn Bigelow",
            imagePath: "https://i.postimg.cc/GpW6KKkf/zerodarkthirty.png",
            featured: false
        },
        {
            _id: ObjectID('665efb609dddec05c68fcd13'),
            title: "Marie Antoinette",
            description: "The retelling of France's iconic but ill-fated queen, Marie Antoinette. From her betrothal and marriage to Louis XVI at 15 to her reign as queen at 19 and ultimately the fall of Versailles.",
            genre: "Historical",
            director: "Sofia Coppola",
            imagePath: "https://i.postimg.cc/FKr4cDVV/marieantoinette.png",
            featured: false
        },
        {
            _id: ObjectID('665efb3b9dddec05c68fcd11'),
            title: "A Wrinkle in Time",
            description: "After the disappearance of her scientist father, three peculiar beings send Meg, her brother, and her friend to space in order to find him.",
            genre: "Fantasy",
            director: "Ava DuVernay",
            imagePath: "https://i.postimg.cc/tCpV1HV1/awrinkleintime.png",
            featured: true
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }} 
                />
            ))}
        </div>
    );
};