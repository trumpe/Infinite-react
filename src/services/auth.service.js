import axios from "axios";
import { API_URL } from "./../constants";

const register = (username, password) => {
  return axios.post(
    API_URL + "signup",
    {
      username,
      password,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

const login = (username, password) => {
  return axios
    .post(
      API_URL + "signin",
      {
        username,
        password,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      alert(JSON.stringify(response.data));
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
