import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <video autoPlay muted loop className="background-video">
        <source src="/WEB-ST.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <button onClick={() => navigate("/dashboard")}>Get Started</button>
      </div>
    </div>
  );
};

export default Home;
