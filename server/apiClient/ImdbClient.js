import got from "got";

const imdbKey = "k_1c5tw4ku"

class ImdbAPIClient {   
  static async getMovies(parameter) {
    try {
      const url = `https://imdb-api.com/API/AdvancedSearch/${imdbKey}?title=${parameter}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default ImdbAPIClient;