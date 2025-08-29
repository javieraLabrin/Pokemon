import "../css/PokemonCard.css";
import { useNavigate } from "react-router-dom";

function PokemonCard({ pokemon, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (e.target.closest(".favorite-btn")) return;
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  return (
    <div
      className="pokemon-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-header">
        <div className="dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="favorites-controls">
          <button
            className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(pokemon.id);
            }}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>
      <div className="card-main">
        <div className="pokemon-image-box">
          <div className="pokemon-image-screen">
            <img
              src={pokemon.sprites?.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
          </div>
          <div className="pokemon-name">
            # {pokemon.id}: {pokemon.name}
          </div>
        </div>
        <div className="pokemon-info-box">
          {pokemon.flavor_text && (
            <p className="pokemon-flavor-text">{pokemon.flavor_text}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
