export const api = {
  root: "https://ws.audioscrobbler.com/2.0/",
  key: process.env.REACT_APP_SECRET_API_KEY
};

export const artist = {
  search: "artist.search",
  getTopAlbums: "artist.gettopalbums",
  getInfo: "artist.getinfo",
  limit: 10
};