import { useState } from "react";

import { Card } from "./Card";
import "../styles/App.css";

const initialOldCards = {
  bulbasaur:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  charmander:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  squirtle:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  chikorita:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png",
  cyndaquil:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png",
  totodile:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png",
  treecko:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/252.png",
  torchic:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png",
  mudkip:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png",
  turtwig:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/387.png",
  chimchar:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/390.png",
  piplup:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/393.png",
};

export function App() {
  const [oldCards, setOldCards] = useState({});
  const [savedCardImages, setSavedCardImages] = useState(initialOldCards);
  const [currCards, setCurrCards] = useState(Object.keys(savedCardImages));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [allowCheats, setAllowCheats] = useState(false);

  function handleCard(name, imgUrl) {
    let addedCards = savedCardImages;
    if (!savedCardImages[name]) {
      addedCards = { ...savedCardImages, [name]: imgUrl };
      setSavedCardImages(addedCards);
    }

    // check if old or new card pulled
    let newCards = "";
    if (!oldCards[name]) {
      newCards = { ...oldCards, [name]: getValue(imgUrl) };
      setOldCards(newCards);
      setScore(score + 1);

      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }
    } else {
      console.log(oldCards);
      console.log(currCards);
      alert(name + " was previously selected!");

      setOldCards({});
      setScore(0);
    }

    setCurrCards(randomPokemons(newCards));
  }

  return (
    <>
      <div className="score-section">
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
        <div></div>
        <button
          onClick={() => {
            setAllowCheats(!allowCheats);
            setScore(0);
            setOldCards({});
          }}
        >
          Turn {allowCheats ? "off" : "on"} easy mode
        </button>
      </div>
      <div className="card-pack">
        <p style={{color: 'red', position: "absolute", top: '95%', right: '1%'}}>By <u>Alex Marty</u> from <u>Unsplash</u></p>
        {currCards.map((item, i) => {
          const newItem = item !== null ? item : newPokemon(oldCards, 1025);
          return (
            <Card
              key={i}
              name={newItem}
              imgUrl={savedCardImages[newItem]}
              handler={handleCard}
              oldCard={oldCards[newItem]}
              allowCheats={allowCheats}
            />
          );
        })}
      </div>
    </>
  );
}

// returns a number between 1 and n
function randomNumber(n) {
  return Math.floor(Math.random() * n) + 1;
}

// returns an array of old pokemon cards and null ones for new cards
function randomPokemons(oldPokemon) {
  const res = [];
  const keys = Object.keys(oldPokemon);
  let ensureNew = false;

  for (let i = 0; i < 12; i++) {
    // ensure that at least 1 new card is added
    if (i === 11 && !ensureNew) {
      res.append(null);
      break;
    }
    if (keys.length < 3 || randomNumber(10) <= 5) {
      ensureNew = true;
      res.push(null);
    } else {
      let randomKey = keys[randomNumber(keys.length) - 1];
      while (res.includes(randomKey)) {
        if (randomNumber(10) <= 5) {
          randomKey = null;
          break;
        }
        randomKey = keys[randomNumber(keys.length) - 1];
      }
      res.push(randomKey);
    }
  }
  // console.log(res);
  return res;
}

function newPokemon(cards, n) {
  let random = randomNumber(n);
  const values = Object.values(cards);

  // console.log((values));
  for (let i = 0; i < n; i++) {
    if (!values.includes(`${random}`) || cards.length === 0) break;
    console.log("retry: " + random);
    random = randomNumber(n);
  }

  return random;
}

function getValue(str) {
  str = str.slice(0, -4);

  let res = "";
  while (str.slice(-1) != "/") {
    res = str.slice(-1) + res;
    str = str.slice(0, -1);
  }

  return res;
}
