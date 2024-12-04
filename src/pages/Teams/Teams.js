import React from "react";
import { motion } from "framer-motion";
import "./Teams.css";

const Teams = ({ teams, colaboradores, deleteColaborador, onColorChange }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <div className="teams-page">
      <h1 style={{ color: "var(--text-color)" }}>Teams</h1>
      <motion.div
        className="teams-table"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {teams.map((team) => (
          <motion.section
            className="team"
            key={team.id}
            style={{
              backgroundColor: `var(--background-color)`,
              color: `var(--text-color)`,
            }}
            variants={cardVariants}
          >
            <h3 style={{ color: `${team.primaryColor}` }}>{team.nome}</h3>
            <div className="color-picker">
              <label>
                Primary Color:
                <input
                  type="color"
                  value={team.primaryColor}
                  onChange={(e) => onColorChange(team.nome, e.target.value)}
                />
              </label>
            </div>
            <motion.div className="team-members" variants={containerVariants}>
              {colaboradores
                .filter((colaborador) => colaborador.team === team.nome)
                .map(({ id, name, cargo, image }) => (
                  <motion.div
                    key={id}
                    className="team-member"
                    variants={cardVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      className="delete-icon"
                      onClick={() => deleteColaborador(id)}
                      aria-label="Delete"
                    >
                      ×
                    </button>
                    <div
                      className="cabecalho"
                      style={{ backgroundColor: team.primaryColor }}
                    >
                      <img
                        src={image}
                        alt={name}
                        className="team-member-image"
                      />
                    </div>
                    <div className="rodape">
                      <h4>{name}</h4>
                      <p>{cargo}</p>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
};

export default Teams;
