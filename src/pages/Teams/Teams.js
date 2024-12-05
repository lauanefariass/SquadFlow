import React from "react";
import { motion } from "framer-motion";
import "./Teams.css";

const Teams = ({
  teams,
  colaboradores,
  deleteColaborador,
  onColorChange,
  deleteTeam,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const teamCardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const memberCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="teams-page">
      <motion.h1
        style={{ color: "var(--text-color)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Teams
      </motion.h1>
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
            variants={teamCardVariants}
          >
            <div className="team-header">
              <h3 style={{ color: `${team.primaryColor}` }}>{team.nome}</h3>
              <motion.button
                className="delete-icon-team"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => deleteTeam(team.id)}
                aria-label="Delete Team"
              >
                ×
              </motion.button>
            </div>
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
                    variants={memberCardVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.button
                      className="delete-icon"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => deleteColaborador(id)}
                      aria-label="Delete"
                    >
                      ×
                    </motion.button>
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
