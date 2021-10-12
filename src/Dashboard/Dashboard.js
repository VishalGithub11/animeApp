import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
const Dashboard = () => {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, SetTopAnime] = useState([]);
  const [search, SetSearch] = useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3NSIsIm5iZiI6MTYzMzk2OTIyOCwiZXhwIjoxNjM2NTYxMjI4LCJpYXQiOjE2MzM5NjkyMjh9.kxiQTkGs3MW5j9NXlz0-xsBTqv1EB_l3FVfeTjLlmpc";

  const handleSearch = (e) => {
    e.preventDefault();

    console.log(search);
    getTenAnime(search);
  };

  console.log("toppest ", topAnime);

  const getTenAnime = async (data) => {
    const searchable = data && data.replace(" ", " %20");

    const url = `https://api.aniapi.com/v1/anime/?title=${searchable}`;
    await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((val) => setAnimeList(val.data.documents.slice(0, 10)));
  };

  const getTenDisplayAnime = async () => {
    const url = `https://api.aniapi.com/v1/anime`;
    await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((val) => {
        console.log(val);
        setAnimeList(val.data.documents.slice(0, 10));
      });
  };

  console.log(animeList);

  useEffect(() => {
    getTenDisplayAnime();
  }, []);

  return (
    <div>
      <Header />
      <div className="content-wrap">
        <Main
          HandleSearch={handleSearch}
          search={search}
          SetSearch={SetSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
};

export default Dashboard;
