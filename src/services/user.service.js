import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./../constants";

const getUserSongs = () => {
  return axios.get(API_URL + "songs", { headers: authHeader() });
};
const postUserSong = (title, description, author) => {
  return axios.post(
    API_URL + "song",
    {
      Title: title,
      Description: description,
      Author: author,
    },
    { headers: authHeader() }
  );
};

export { getUserSongs, postUserSong };
