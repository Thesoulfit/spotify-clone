const clientId = "8dbc89fa046b422d9edc5bad45c354d5";
const clientSecret = "f04e51bd1c8d410a8a895930f955f4a6";
const clientEncoded =
  "OGRiYzg5ZmEwNDZiNDIyZDllZGM1YmFkNDVjMzU0ZDU6ZjA0ZTUxYmQxYzhkNDEwYThhODk1OTMwZjk1NWY0YTY=";

const spotifyApi = {
  browseNewReleases: async (api_token) => {
    //  fetch(url, config)

    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    };
    const response = await fetch(
      "https://api.spotify.com/v1/browse/new-releases",
      config
    );

    // console.log("response", response);
    // console.log("response", response.json());
    return response.json();
  },
  browseCatagories: async (api_token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    };
    const response = await fetch(
      "https://api.spotify.com/v1/browse/categories",
      config
    );

    return response.json();
  },
  browseFeaturedPlaylists: async (api_token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    };
    const response = await fetch(
      "https://api.spotify.com/v1/browse/featured-playlists",
      config
    );

    return response.json();
  },
  search: async (query, api_token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    };
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=album,track,artist`,
      config
    );
    // console.log("response>>>>", response.json());
    return response.json();
  },
  generateSpotifyToken: async () => {
    const clientEncoded =
      "OGRiYzg5ZmEwNDZiNDIyZDllZGM1YmFkNDVjMzU0ZDU6ZjA0ZTUxYmQxYzhkNDEwYThhODk1OTMwZjk1NWY0YTY=";
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + clientEncoded,
      },
      body: "grant_type=client_credentials",
    });

    // console.log(result.json());
    const data = await result.json();
    return data;
  },
};
