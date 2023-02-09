import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import { BACKDROP_BASE_URL } from "./config.js";

import TvShowDetail from "./components/TvShowDetail/TvShowDetail";
import TvShowList from "./components/TvShowList/TvShowList";
import Logo from "./components/Logo/Logo";
import SearchBar from "./components/SearchBar/SearchBar";

import "./global.css";
import s from "./style.module.css";
import logo from "./assets/images/logo.png";

function App() {
  const [currentTvShow, setCurrentTvShow] = useState();
  const [recommendationsList, setRecommendationsList] = useState([]);

  async function fetchPopulars() {
    const populars = await TVShowAPI.fetchPopulars();
    if (populars.length > 0) {
      setCurrentTvShow(populars[0]);
    }
  }
  async function fetchRecommendations(tvShowId) {
    const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
    if (recommendations.length > 0) {
      setRecommendationsList(recommendations.slice(0, 10));
    }
  }
  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTvShow) {
      fetchRecommendations(currentTvShow.id);
    }
  }, [currentTvShow]);

  async function searchTvShow(tvShowName) {
    const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
    if (searchResponse.length > 0) {
      setCurrentTvShow(searchResponse[0]);
    }
  }

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTvShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTvShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <div>
              <Logo
                image={logo}
                title="WhatTowatch"
                subTitles="Classement de vos séries"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <SearchBar onSubmit={searchTvShow} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTvShow && <TvShowDetail tvShow={currentTvShow} />}
      </div>
      <div className={s.recommended_shows}>
        {recommendationsList && recommendationsList.length > 0 && (
          <TvShowList
            onClickItem={setCurrentTvShow}
            tvShowList={recommendationsList}
          />
        )}
      </div>
    </div>
  );
}

export default App;
