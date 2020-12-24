import React, { useState, useRef } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { postUserSong } from "../services/user.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const AddSong = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeAuthor = (e) => {
    const author = e.target.value;
    setAuthor(author);
  };

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setMessage("");

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      postUserSong(title, description, author)
        .then((response) => {
          setSuccessful(true);
          setMessage("Success!!!");
          props.Add(response.data);
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(message);
        });
    }
  };
  const HandleExit = (e) => {
    e.preventDefault();
    props.Exit();
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={(e) => handleAdd(e)} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Input
                  type="text"
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={onChangeDescription}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <Input
                  type="text"
                  className="form-control"
                  name="author"
                  value={author}
                  onChange={onChangeAuthor}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Add</button>
                <button
                  onClick={(e) => HandleExit(e)}
                  className="btn btn-primary btn-block"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
              <button
                onClick={(e) => HandleExit(e)}
                className="btn btn-primary btn-block"
              >
                Back
              </button>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default AddSong;
