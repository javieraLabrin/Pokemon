import { useParams, useLocation } from "react-router-dom";
import "../css/Pokedex.css";

function Pokedex() {
  const { id } = useParams();
  const location = useLocation();
  const pokemon = location.state?.pokemon;

  return (
    <div className="pokedex-container">
      <div className="pokedex-card">
        <div className="header">
          <button
            className="pokedex-back-arrow"
            onClick={() => window.history.back()}
            aria-label="Grid"
          >
            ← Back
          </button>
          <p className="pokedex-title">Pokédex</p>
        </div>

        <div className="content">
          <div className="left-section">
            <img
              src={pokemon.sprites?.front_default}
              alt="Gengar"
              className="pokemon-img"
            />
          </div>

          <div className="right-section">
            <div className="info">
              <div className="pokedex-title-1">
                #0{id} {pokemon.name}
              </div>
              <div className="pokedex-title-2">{pokemon.genus}</div>
              <div className="pokedex-subtitle">HT: {pokemon.height}</div>
              <div className="pokedex-subtitle">WT: {pokemon.weight}</div>
            </div>
            <div className="types">
              <span className={`type ${pokemon.types[0].type.name}`}>
                {pokemon.types[0].type.name}
              </span>
              {pokemon.types[1] && (
                <span className={`type ${pokemon.types[1].type.name}`}>
                  {pokemon.types[1].type.name}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="footer">
          <p>{pokemon.flavor_text}</p>
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
