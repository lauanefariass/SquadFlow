import "./Team.css";

const Team = ({ name, colaboradores }) => {
  const teamClass = name.toLowerCase().replace(/ /g, "-");

  return (
    <section className={`team ${teamClass}`}>
      <h3>{name}</h3>
      <div className="team-members">
        {colaboradores.map((colaborador, index) => (
          <div key={index} className="team-member">
            <img
              src={colaborador.image} 
              alt={colaborador.name}
              className="team-member-image"
            />
            <h4>{colaborador.name}</h4>
            <p>{colaborador.cargo}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
