import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: `var(--background-color)`,
        color: `var(--text-color)`,
      }}
    >
      <p>© 2024 SquadFlow. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
