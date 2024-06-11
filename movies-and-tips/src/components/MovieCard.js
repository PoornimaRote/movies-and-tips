import React from "react";
import { Link, useLocation } from "react-router-dom";

const MovieCard = ({
	movie,
	addToFavorites,
	isFavorite,
	removeFromFavorites,
}) => {
	const location = useLocation();

	const handleAddToFavorites = () => {
		addToFavorites(movie);
	};

	const handleRemoveFromFavorites = () => {
		removeFromFavorites(movie.id);
	};

	return (
		<div className="movie-card">
			<Link to={`/movie/${movie.id}`}>
				<img
					src={movie.posterurl}
					alt={movie.title}
					className="movie-poster"
				/>
			</Link>
			{/* <img src={movie.posterurl} alt={movie.title} /> */}
			<h3>{movie.title}</h3>
			{/* <Link to={`/movie/${movie.id}`}>More Info</Link> */}
			{isFavorite && location.pathname === "/favourite" ? (
				<button
					className="remove-from-favorites-button"
					onClick={handleRemoveFromFavorites}
				>
					Remove from Favourites
				</button>
			) : (
				<button
					className="add-to-favorites-button"
					onClick={handleAddToFavorites}
				>
					Add to Favourites
				</button>
			)}
		</div>
	);
};

export default MovieCard;
