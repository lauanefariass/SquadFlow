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
      {colaboradores.map(({ name, cargo, image }, index) => (
        <div key={index} className="team-member">
          {/* Ícone de exclusão */}
          <button
            className="delete-icon"
            onClick={() => onDelete(index)}
            aria-label="Delete"
          >
            ×
          </button>

          {/* Cabeçalho com imagem */}
          <div className="cabecalho" style={{ backgroundColor: primaryColor }}>
            <img src={image} alt={name} className="team-member-image" />
          </div>

          {/* Rodapé com detalhes */}
          <div className="rodape">
            <h4>{name}</h4>
            <p>{cargo}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Team;
