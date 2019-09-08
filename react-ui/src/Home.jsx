import React from "react";
import { Link } from "react-router-dom";

const newMedusa = {
  name: "HI",
  color: 0,
  eyes: 0,
  mouth: 0,
  arms: 0,
  head: 0
};

const Home = () => {
  const handleClick = async e => {
    e.preventDefault();
    console.log("Adding");
    const res = await fetch("/medoosas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMedusa)
    });
    // res = await fetch("/medoosas");
    const json = await res.json();
    console.log("JSON", json);
  };

  return (
    <div>
      <div>
        <Link to="/share">Share</Link>
      </div>
      <div>
        <button onClick={handleClick}>Click</button>
      </div>
    </div>
  );
};

export default Home;
