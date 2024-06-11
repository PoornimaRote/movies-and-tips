// MovieDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = ({
	addToFavorites,
	removeFromFavorites,
	favoriteMovies,
}) => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		axios
			.get("/data.json")
			.then((response) => {
				const allMovies = [
					...response.data["movies-coming"],
					...response.data["movies-in-theaters"],
					...response.data["top-rated-india"],
					...response.data["top-rated-movies"],
					...response.data["favourite"],
				];
				setMovie(allMovies.find((m) => m.id === id));
			})
			.catch((error) => {
				console.error("There was an error fetching the data:", error);
			});
	}, [id]);

	const handleGoBack = () => {
		window.history.back();
	};

	if (!movie) return <div>Loading...</div>;

	return (
		<div className="movie-detail-container">
			<div className="movie-details">
				<img src={movie.posterurl} alt={movie.title} />
				<button className="back-button" onClick={handleGoBack}>
					Back-to-List
				</button>{" "}
				{/* Back button */}
				{/* <h1>{movie.title}</h1>
				<p>{movie.storyline}</p>
				<p>Genres: {movie.genres.join(", ")}</p>
				<p>Release Date: {movie.releaseDate}</p>
				<p>Actors: {movie.actors.join(", ")}</p>
				<p>Duration: {movie.duration}</p>
				<p>IMDB Rating: {movie.imdbRating}</p> */}
				<h1>
					{movie.title} ({movie.year})
				</h1>
				<p>
					<strong>IMDB Rating:</strong> {movie.imdbRating}
				</p>
				<p>
					<strong>Duration:</strong> {movie.duration}
				</p>
				<p>
					<strong>Genres:</strong> {movie.genres.join(", ")}
				</p>
				<p>
					<strong>Actors:</strong> {movie.actors.join(", ")}
				</p>
				<p>
					<strong>Storyline:</strong> {movie.storyline}
				</p>
			</div>
		</div>
	);
};

export default MovieDetails;
