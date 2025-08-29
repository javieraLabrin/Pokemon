import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import "../css/PokemonGrid.css";

import { useNavigate } from "react-router-dom";

function PokemonGrid() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAll, setLoadingAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPokemonDetails, setCurrentPokemonDetails] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [showFavorites, setShowFavorites] = useState(false);
  const pokemonsPerPage = 30;

  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = localStorage.getItem("pokemonFavorites");
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "pokemonFavorites",
      JSON.stringify(Array.from(favorites))
    );
  }, [favorites]);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        setLoadingAll(true);
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=10000"
        );

        const allPokemonsBasic = response.data.results.map(
          (pokemon, index) => ({
            id: index + 1,
            name: pokemon.name,
            url: pokemon.url,
          })
        );

        setAllPokemons(allPokemonsBasic);
        setLoadingAll(false);
      } catch (error) {
        console.error("Error loading all Pokémon:", error);
        setLoadingAll(false);
      }
    };

    fetchAllPokemons();
  }, []);

  useEffect(() => {
    let filtered = allPokemons;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }

    if (showFavorites) {
      filtered = filtered.filter((pokemon) => favorites.has(pokemon.id));
    }

    setCurrentPage(1);
    setFilteredPokemons(filtered);
  }, [searchTerm, allPokemons, showFavorites, favorites]);

  const currentPokemons = useMemo(() => {
    const startIndex = (currentPage - 1) * pokemonsPerPage;
    const endIndex = startIndex + pokemonsPerPage;
    return filteredPokemons.slice(startIndex, endIndex);
  }, [filteredPokemons, currentPage, pokemonsPerPage]);

  useEffect(() => {
    const fetchCurrentPokemonDetails = async () => {
      if (currentPokemons.length === 0) {
        setCurrentPokemonDetails([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const pokemonDetails = await Promise.all(
          currentPokemons.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url);
            const speciesResponse = await axios.get(
              `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}/`
            );

            const flavorEntry = speciesResponse.data.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            );
            const genusEntry = speciesResponse.data.genera.find(
              (entry) => entry.language.name === "en"
            );
            return {
              ...detailResponse.data,
              flavor_text: flavorEntry
                ? flavorEntry.flavor_text.replace(/\f/g, " ")
                : "",
              genus: genusEntry ? genusEntry.genus : "",
            };
          })
        );
        setCurrentPokemonDetails(pokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error loading Pokémon details:", error);
        setCurrentPokemonDetails([]);
        setLoading(false);
      }
    };

    fetchCurrentPokemonDetails();
  }, [currentPokemons]);

  const toggleFavorite = (pokemonId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(pokemonId)) {
        newFavorites.delete(pokemonId);
      } else {
        newFavorites.add(pokemonId);
      }
      return newFavorites;
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  if (loadingAll) return <div className="loading">Loading all Pokémon...</div>;

  return (
    <div className="App">
      <div className="header-spacer">
        <div className="pokemonGrid-logo-back-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
            alt="Pokémon Logo"
            className="pokemonGrid-pokemon-logo"
          />

          <button
            className="pokemonGrid-back-arrow"
            onClick={() => navigate("/")}
            aria-label="Back to landing"
          >
            ← Back
          </button>
        </div>

        <div className="pokemonGrid-text-container">
          <h1 className="pokemonGrid-title">PokeGrid</h1>
          <h1 className="pokemonGrid-subtitle">Page {currentPage}</h1>
        </div>

        <div className="controls-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Pokémon by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input styled-search"
            />
          </div>

          <div className="favorites-controls">
            <button
              className={`favorites-toggle ${showFavorites ? "active" : ""}`}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              ⭐ {showFavorites ? "Show All" : "Favorites"}
              {favorites.size > 0 && ` (${favorites.size})`}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading Pokémon...</div>
      ) : (
        <>
          <div className="pokemon-grid">
            {currentPokemonDetails.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isFavorite={favorites.has(pokemon.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {filteredPokemons.length === 0 && (
            <div className="no-results">
              {showFavorites && searchTerm
                ? `No favorite Pokémon found starting with "${searchTerm}"`
                : showFavorites
                ? "You don't have any favorite Pokémon yet"
                : searchTerm
                ? `No Pokémon found starting with "${searchTerm}"`
                : "No Pokémon found"}
            </div>
          )}

          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              &#8592;
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              &#8594;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PokemonGrid;
