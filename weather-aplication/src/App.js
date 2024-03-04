import "./App.css";
import Search from "./Search";
import axios from "axios";
import React, { useState } from "react";
import "flag-icon-css/css/flag-icons.min.css";

function App() {
	const [weatherData, setWeatherData] = useState(null);
	const [error, setError] = useState("");
	const handleSearch = async (city) => {
		const apiKey = "2aafeb4af946cad974c4c08590ea1b2d";
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;
		try {
			const response = await axios.get(url);
			setWeatherData(response.data);
			setError("");
		} catch (error) {
			console.error("Bład nie dziala cos ", error);
			setError("Nie znaleziono miasta. Błędna nazwa");
		}
	};
	return (
		<div className="App">
			<header className="App-header">Weather Aplication</header>
			<Search onSearch={handleSearch} />
			{error && <div className="error">{error}</div>}
			{weatherData && (
				<div>
					<h2>
						Pogoda dla: {weatherData.name}, {weatherData.sys.country}
						<span
							className={`flag-icon flag-icon-${weatherData.sys.country.toLowerCase()}`}
						></span>
					</h2>
					<p>Temperatura: {weatherData.main.temp}°C</p>
					<p>Warunki: {weatherData.weather[0].description}</p>
					<p>Wilgotność: {weatherData.main.humidity}%</p>
					<p>Wiatr: {weatherData.wind.speed} m/s</p>
					<img
						src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
						alt="Weather icon"
					/>
				</div>
			)}
		</div>
	);
}

export default App;
