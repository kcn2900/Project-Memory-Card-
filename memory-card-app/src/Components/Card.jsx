import { useEffect } from "react";
import { useState } from "react";

export function Card(prop) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (!prop.imgUrl) {
        const url = `https://pokeapi.co/api/v2/pokemon/${prop.name}`;

        // console.log(url);
        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setName(response["name"]);
            setImgUrl(response["sprites"]["front_default"]);
            // console.log(response);
          })
          .catch((err) => {
            console.log(err);
            setName("bulbasaur");
            setImgUrl(
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            );
          });
      } else {
        setName(prop.name);
        setImgUrl(prop.imgUrl);
      }
    }
    return () => {ignore = true};
  }, [prop.name, prop.imgUrl]);

  return (
    <>
      <div
        className={`card ${prop.oldCard && prop.allowCheats ? 'highlight' : ''}`}
        onClick={() => {
          prop.handler(name, imgUrl);
        }}
      >
        <img src={imgUrl} alt={name} />
        <p>{capitalizeFirstLetter(name)}</p>
      </div>
    </>
  );
}

// simply returns the capital of the first letter of the given string
function capitalizeFirstLetter(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
