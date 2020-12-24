import React, { useState, useEffect } from "react";

import { getUserSongs } from "../services/user.service";
import AddSong from "./AddSong";

const BoardUser = () => {
  const [content, setContent] = useState([]);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    getUserSongs().then(
      (response) => {
        let data = response.data;
        data.forEach((element) => {
          element.created = new Date(element.created).toString();
        });
        setContent(data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  const handleAddSong = (song) => {
    setContent([...content, song]);
  };
  const OpenAdd = (e) => {
    e.preventDefault();
    setAdding(true);
  };
  const ExitAdd = () => {
    setAdding(false);
  };
  if (adding) {
    return <AddSong Add={handleAddSong} Exit={ExitAdd}></AddSong>;
  }
  return (
    <div className="container">
      <header className="jumbotron">
        {content.length == 0 ? (
          <div style={{ textAlign: "center" }}>
            <h1>No songs yet please add some</h1>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h1>My songs</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Author</th>
                  <th scope="col">Date Created</th>
                </tr>
              </thead>
              <tbody>
                {content.map((song, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{song.title}</td>
                      <td>{song.description}</td>
                      <td>{song.author}</td>
                      <td>{song.created}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <button onClick={OpenAdd} className="btn btn-primary btn-block">
          Add
        </button>
      </header>
    </div>
  );
};

export default BoardUser;
