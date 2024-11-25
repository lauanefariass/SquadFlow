import "./Footer.css";
import facebookIcon from "../../img/facebook (1).svg";
import twitterIcon from "../../img/twitter (1).svg";
import instagramIcon from "../../img/instagram (1).svg";

const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <ul>
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookIcon} alt="Facebook" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" />
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
