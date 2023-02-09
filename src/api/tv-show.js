import axios from "axios";
import { BASE_URL, API_KEY_URL } from "../config";

export class TVShowAPI {
  static async fetchPopulars() {
    try {
      const response = await axios.get(`${BASE_URL}tv/popular${API_KEY_URL}`);
      return response.data.results;
    } catch (error) {
      alert("Erreur durant la recherche des séries populaires" + error.message);
    }
  }

  static async fetchRecommendations(tvShowId) {
    try {
      const response = await axios.get(
        `${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_URL}`
      );
      return response.data.results;
    } catch (error) {
      alert("Erreur durant la recherche des recommendations" + error.message);
    }
  }

  static async fetchByTitle(title) {
    try {
      const response = await axios.get(
        `${BASE_URL}search/tv${API_KEY_URL}&query=${title}`
      );
      return response.data.results;
    } catch (error) {
      alert(
        "Erreur durant la recherche de la recherche par la barre de recherche" +
          error.message
      );
    }
  }
}
  