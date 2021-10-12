import React from "react";
import { Link } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  return (
    <article className="anime-card">
      <Link
        to={{
          pathname: `/anime/${anime.titles.en}`,
          state: {
            info: anime,
          },
        }}
      >
        <figure>
          <img src={anime.cover_image} alt="Anime Image" />
        </figure>
        <h3>{anime.titles.en}</h3>
      </Link>
    </article>
  );
};

export default AnimeCard;
