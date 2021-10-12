import React from "react";
import { useLocation } from "react-router-dom";

const AnimeInfo = () => {
  const location = useLocation();
  const info = location.state.info;
  console.log(info);

  return (
    <div>
      <div className="container">
        <div className="left">
          <img src={info.cover_image} style={{ width: "35em" }} />
        </div>
        <div className="right">
          <h2>{info.titles.en}</h2>

          <a href={info.trailer_url}>
            {" "}
            <button className="trailer">Watch Trailer</button>
          </a>

          <div className="episodes">
            Number of Episodes: {info.episodes_count}
          </div>

          <div className="season_year">Season-Year: {info.season_year}</div>
          <div className="description">
            <strong>Description: </strong> {info.descriptions.en}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfo;
