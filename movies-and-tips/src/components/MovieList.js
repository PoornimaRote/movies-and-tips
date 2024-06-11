import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const MovieList = ({
	category,
	addToFavorites,
	favoriteMovies,
	removeFromFavorites,
	searchQuery,
}) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		axios
			.get("/data.json")
			.then((response) => {
				const moviesData = response.data[category];
				if (Array.isArray(moviesData)) {
					setMovies(moviesData);
				} else {
					console.error(
						`Data for category ${category} is not an array`
					);
				}
			})
			.catch((error) => {
				console.error("There was an error fetching the data:", error);
			});
	}, [category]);

	const filteredMovies = movies.filter((movie) => {
		return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
	});

	return (
		<div className="movie-list">
			{filteredMovies.length > 0 ? (
				filteredMovies.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						addToFavorites={addToFavorites}
						isFavorite={favoriteMovies.some(
							(fav) => fav.id === movie.id
						)}
						removeFromFavorites={removeFromFavorites}
					/>
				))
			) : (
				<p>No related movies found.</p>
			)}
		</div>
	);
};

export default MovieList;
