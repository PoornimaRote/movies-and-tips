import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import "./App.css";

const App = () => {
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [message, setMessage] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const timeout = setTimeout(() => {
			setMessage("");
		}, 2000);

		return () => clearTimeout(timeout);
	}, [message]);

	const addToFavorites = (movie) => {
		if (!favoriteMovies.some((fav) => fav.id === movie.id)) {
			setFavoriteMovies([...favoriteMovies, movie]);
			setMessage(`${movie.title} successfully added to favorites.`);
		} else {
			setMessage(`${movie.title} is already in favorites.`);
		}
	};

	const removeFromFavorites = (id) => {
		const removedMovie = favoriteMovies.find((movie) => movie.id === id);
		setFavoriteMovies(favoriteMovies.filter((movie) => movie.id !== id));
		setMessage(
			`${removedMovie.title} successfully removed from favorites.`
		);
	};

	return (
		<Router>
			<div className="app">
				<Navbar setSearchQuery={setSearchQuery} />
				{message && (
					<div
						className={`message ${
							message.includes("successfully added to favorites.")
								? "add-to-favorites"
								: message.includes(
										"successfully removed from favorites."
								  )
								? "remove-from-favorites"
								: "already-in-favorites"
						}`}
					>
						{message}
					</div>
				)}
				<div className="content">
					<Routes>
						<Route
							path="/"
							element={
								<MovieList
									category="movies-in-theaters"
									addToFavorites={addToFavorites}
									favoriteMovies={favoriteMovies}
									searchQuery={searchQuery}
								/>
							}
						/>
						<Route
							path="/coming-soon"
							element={
								<MovieList
									category="movies-coming"
									addToFavorites={addToFavorites}
									favoriteMovies={favoriteMovies}
									searchQuery={searchQuery}
								/>
							}
						/>
						<Route
							path="/top-rated-india"
							element={
								<MovieList
									category="top-rated-india"
									addToFavorites={addToFavorites}
									favoriteMovies={favoriteMovies}
									searchQuery={searchQuery}
								/>
							}
						/>
						<Route
							path="/top-rated-movies"
							element={
								<MovieList
									category="top-rated-movies"
									addToFavorites={addToFavorites}
									favoriteMovies={favoriteMovies}
									searchQuery={searchQuery}
								/>
							}
						/>
						<Route
							path="/favourite"
							element={
								<Favorites
									favoriteMovies={favoriteMovies}
									removeFromFavorites={removeFromFavorites}
								/>
							}
						/>
						<Route
							path="/movie/:id"
							element={
								<MovieDetails
									addToFavorites={addToFavorites}
									removeFromFavorites={removeFromFavorites}
									favoriteMovies={favoriteMovies}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
