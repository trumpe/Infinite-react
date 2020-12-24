import React, { useState, useEffect } from "react";

const Home = () => {
  const [content, setContent] = useState(
    "Dobre dojdovte vo mojata aplikacija ;)"
  );

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;
