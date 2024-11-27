import "./Team.css";

const Team = ({
  name,
  primaryColor,
  secondaryColor,
  colaboradores,
  onDelete,
  onColorChange,
}) => {
  return (
    <section
      className={`team ${name.toLowerCase().replace(/ /g, "-")}`}
      style={{ backgroundColor: secondaryColor }}
    >
      <h3 style={{ color: primaryColor }}>{name}</h3>
      <div className="color-picker">
        <label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) =>
              onColorChange(name, e.target.value, secondaryColor)
            }
          />
        </label>
        <label>
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => onColorChange(name, primaryColor, e.target.value)}
          />
        </label>
      </div>
      <div className="team-members">
        {colaboradores.map(({ id, name, cargo, image }) => (
          <div key={id} className="team-member">
            <button
              className="delete-icon"
              onClick={() => onDelete(id)} // Usa o ID para deletar
              aria-label="Delete"
            >
              ×
            </button>
            <div
              className="cabecalho"
              style={{ backgroundColor: primaryColor }}
            >
              <img src={image} alt={name} className="team-member-image" />
            </div>
            <div className="rodape">
              <h4>{name}</h4>
              <p>{cargo}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
