import React, { useState, useRef } from "react";
import "./Banner.css";
import video from "../../img/WEB-ST.mp4";

const Banner = ({ onShowForm }) => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const handleGetStartedClick = () => {
    setShowForm(true);
    if (onShowForm) {
      onShowForm();
    }
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="banner">
      <video className="banner-video" autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!showForm && (
        <button className="get-started" onClick={handleGetStartedClick}>
          Get Started
        </button>
      )}
      <div ref={formRef} />
    </div>
  );
};

export default Banner;
