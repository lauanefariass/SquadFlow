import "./Team.css";

const Team = ({
  name,
  primaryColor,
  secondaryColor,
  colaboradores,
  onDelete,
}) => (
  <section
    className={`team ${name.toLowerCase().replace(/ /g, "-")}`}
    style={{ backgroundColor: secondaryColor }}
  >
    <h3 style={{ color: primaryColor }}>{name}</h3>
    <div className="team-members">
      {colaboradores.length > 0 ? (
        colaboradores.map(({ name, cargo, image }, index) => (
          <div key={index} className="team-member">
            <div
              className="cabecalho"
              style={{ backgroundColor: primaryColor }}
            >
              <img src={image} alt={name} className="team-member-image" />
            </div>
            <div className="rodape">
              <h4>{name}</h4>
              <p>{cargo}</p>
              {/* Certifique-se de que o botão está visível */}
              <button
                className="delete-button"
                onClick={() => onDelete(index)}
                style={{ backgroundColor: primaryColor }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: primaryColor }}>No members in this team yet.</p>
      )}
    </div>
  </section>
);

export default Team;
