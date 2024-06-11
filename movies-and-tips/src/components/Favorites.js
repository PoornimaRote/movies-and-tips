import React from "react";
import MovieCard from "./MovieCard";

const Favorites = ({ favoriteMovies, removeFromFavorites }) => {
	return (
		<div className="favorites">
			{favoriteMovies.length > 0 ? (
				favoriteMovies.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						isFavorite={true}
						removeFromFavorites={removeFromFavorites}
					/>
				))
			) : (
				<p>No favorite movies yet.</p>
			)}
		</div>
	);
};

export default Favorites;
