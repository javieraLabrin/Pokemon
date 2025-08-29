import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import PokemonGrid from "./PokemonGrid";
import Pokedex from "./Pokedex";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/grid" element={<PokemonGrid />} />
        <Route path="/pokedex/:id" element={<Pokedex />} />
      </Routes>
    </Router>
  );
}

export default App;