import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import axios from "axios";
import "./App.css";

function App() {
  const [colors, setColors] = useState({
    bgColor: "#2c3e50",
    fontColor: "white",
    cardBgColor: "#34495e",
  });

  const toggleColors = () => {
    setColors((prevColors) => ({
      bgColor: prevColors.bgColor === "#2c3e50" ? "white" : "#2c3e50",
      fontColor: prevColors.fontColor === "white" ? "black" : "white",
      cardBgColor: prevColors.cardBgColor === "#34495e" ? "#f0f0f0" : "#34495e",
    }));
  };

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState("Americas");

  const regions = ["Americas", "Africa", "Europe", "Asia", "Oceania"];

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(term)
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/region/${region}`
        );
        const countriesData = response.data.map((country) => ({
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital ? country.capital[0] : "N/A",
          flagUrl: `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`,
        }));
        setCountries(countriesData);
        setFilteredCountries(countriesData);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch countries for the ${region} region. Please try again.`);
      }
    };

    fetchCountries();
  }, [region]);

  return (
    <div
      className="App"
      style={{ backgroundColor: colors.bgColor, color: colors.fontColor }}
    >
      <Header onToggleMode={toggleColors} />

      <div className="search-container">
        <input
          type="text"
          placeholder={`Search for a country in ${region}...`}
          value={searchTerm}
          onChange={handleSearch}
          style={{
            backgroundColor: colors.bgColor,  // Set input background to match the app background
            color: colors.fontColor,  // Set font color based on the app's font color
            border: `1px solid ${colors.fontColor}`,  // Border color based on font color
            padding: "0.5rem",
            borderRadius: "4px",
            marginRight: "1rem",
            width: "50%",
          }}
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="region-select"
          style={{
            backgroundColor: colors.bgColor,  // Set select dropdown background to match the app background
            color: colors.fontColor,  // Set font color based on the app's font color
            border: `1px solid ${colors.fontColor}`,  // Border color based on font color
            padding: "0.5rem",
            borderRadius: "4px",
          }}
        >
          {regions.map((regionOption, index) => (
            <option key={index} value={regionOption}>
              {regionOption}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="countries-container">
        {filteredCountries.map((country, index) => (
          <div
            key={index}
            className="country-card"
            style={{
              backgroundColor: colors.cardBgColor,
              color: colors.fontColor,
            }}
          >
          <a
  href={`/design.html?country=${encodeURIComponent(country.name)}&bgColor=${encodeURIComponent(colors.bgColor)}&&fontColor=${encodeURIComponent(colors.fontColor)}`}
>

  <img
    src={country.flagUrl}
    alt={`Flag of ${country.name}`}
    className="country-flag"
  />
</a>



            <div className="country-info">
              <h2>{country.name}</h2>
              <p>
                <strong>Capital:</strong> {country.capital}
              </p>
              <p>
                <strong>Population:</strong> {country.population}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
