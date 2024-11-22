import "./Footer.css";

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
              <img src="/img/facebook.svg" alt="Facebook " />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/twitter.svg" alt="Twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/instagram.svg" alt="Instagram " />
            </a>
          </li>
        </ul>
      </section>
      <section>
        <img src="/img/logo.png" alt="SquadFlow logo" />
      </section>
      <section>
        <p>Developed by Lauane.</p>
      </section>
    </footer>
  );
};

export default Footer;
