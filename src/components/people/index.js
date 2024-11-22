import "./Team.css";

const Team = ({ name, primaryColor, secondaryColor, colaboradores }) => {
  return (
    <section
      className={`team ${name.toLowerCase().replace(/ /g, "-")}`}
      style={{ backgroundColor: secondaryColor }}
    >
      <h3 style={{ color: primaryColor }}>{name}</h3>
      <div className="team-members">
        {colaboradores.length > 0 ? (
          colaboradores.map((colaborador, index) => (
            <div key={index} className="team-member">
              <div
                className="cabecalho"
                style={{ backgroundColor: primaryColor }}
              >
                <img
                  src={colaborador.image}
                  alt={colaborador.name}
                  className="team-member-image"
                />
              </div>
              <div className="rodape">
                <h4>{colaborador.name}</h4>
                <p>{colaborador.cargo}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: primaryColor }}>No members in this team yet.</p>
        )}
      </div>
    </section>
  );
};

export default Team;
