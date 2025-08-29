import React, { useEffect, useState } from "react";
import "../css/LandingPage.css";
import { useNavigate } from "react-router-dom";

import pokeballImage from "../img/Pokeball.png";
import detectivePikachuImg from "../img/detective-pikachu.png";
import rightFoot from "../img/right-foot.png";
import leftFoot from "../img/left-foot.png";
import pokemon1 from "../img/Pokemon1.png";
import pokemon2 from "../img/Pokemon2.png";
import pokemon3 from "../img/Pokemon3.png";
import pokemon4 from "../img/Pokemon4.png";
import pokemon5 from "../img/Pokemon5.png";
import pokemon6 from "../img/Pokemon6.png";

const LandingPage = () => {
  const [startText, setStartText] = useState("");
  const fullText = "START";
  const [charIndex, setCharIndex] = useState(0);

  const [step, setStep] = useState(0);

  const navigate = useNavigate();

  const pokemonImages = [
    pokemon1,
    pokemon2,
    pokemon3,
    pokemon4,
    pokemon5,
    pokemon6,
  ];

  const [current, setCurrent] = useState({
    index: 0,
    pos: { top: 100, left: 100 },
  });
  const [prev, setPrev] = useState({
    index: null,
    pos: { top: 0, left: 0 },
  });
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setPrev(current);
        const nextIndex = (current.index + 1) % pokemonImages.length;
        const nextPos = {
          top: Math.random() * 0.7 * window.innerHeight * 0.9,
          left: Math.random() * (window.innerWidth - 150),
        };
        setCurrent({ index: nextIndex, pos: nextPos });
        setShow(true);
      }, 350);
    }, 1200);
    return () => clearInterval(interval);
  }, [current, pokemonImages.length]);

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setStartText((prev) => prev + fullText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      const restartTimer = setTimeout(() => {
        setStartText("");
        setCharIndex(0);
      }, 3000);
      return () => clearTimeout(restartTimer);
    }
  }, [charIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const footprints = [
    { img: rightFoot, style: { top: "520px", left: "600px" } },
    { img: leftFoot, style: { top: "470px", left: "680px" } },
    { img: rightFoot, style: { top: "520px", left: "760px" } },
    { img: leftFoot, style: { top: "470px", left: "840px" } },
  ];

  return (
    <div className="landing-container">
      <div className="landing-background-red"></div>
      <div className="landing-background-white"></div>

      <div className="landing-logo-back-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
          alt="Pokémon Logo"
          className="landing-pokemon-logo"
        />
      </div>

      <div className="landing-text-container">
        <h1 className="landing-title">Seen That Pokémon?</h1>
        <p className="landing-subtitle">
          The fastest way to find your Pokémon's data
        </p>
      </div>

      <div className="landing-start-button-and-pokeball">
        <div className="pokeball-container">
          <img src={pokeballImage} alt="Pokeball" className="pokeball" />
        </div>
        <button className="start-button" onClick={() => navigate("/grid")}>
          {startText}
          <span className="cursor">|</span>
        </button>
      </div>

      <div className="detective-pikachu">
        <img
          src={detectivePikachuImg}
          alt="Detective Pikachu"
          className="detective-pikachu"
        />
      </div>

      <div className="pisadas-pikachu">
        {footprints.map((foot, index) => (
          <img
            key={index}
            src={foot.img}
            alt="footprint"
            className={`footprint ${step === index ? "visible" : ""}`}
            style={foot.style}
          />
        ))}
      </div>

      {prev.index !== null && (
        <img
          src={pokemonImages[prev.index]}
          alt="pokemon-prev"
          className={`pokemon-silhouette fade-out`}
          style={{
            top: `${prev.pos.top}px`,
            left: `${prev.pos.left}px`,
          }}
        />
      )}
      <img
        src={pokemonImages[current.index]}
        alt="pokemon-current"
        className={`pokemon-silhouette ${show ? "fade-in" : "fade-out"}`}
        style={{
          top: `${current.pos.top}px`,
          left: `${current.pos.left}px`,
        }}
      />
    </div>
  );
};

export default LandingPage;
