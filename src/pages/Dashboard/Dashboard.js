import React, { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import InputText from "../../components/InputText/InputText";
import List from "../../components/List/List";
import Button from "../../components/button/index";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({
  teams,
  colaboradores,
  aoColaboradorCadastrado,
  onNewTeamCreated,
}) => {
  const [name, setName] = useState("");
  const [cargo, setCargo] = useState("");
  const [image, setImage] = useState("");
  const [teamSelected, setTeamSelected] = useState("");

  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamPrimaryColor, setNewTeamPrimaryColor] = useState("#FFFFFF");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !cargo || !teamSelected) {
      alert("Please fill in all required fields.");
      return;
    }
    aoColaboradorCadastrado({
      name,
      cargo,
      image: image || "https://via.placeholder.com/150",
      team: teamSelected,
    });

    setName("");
    setCargo("");
    setImage("");
    setTeamSelected("");
  };

  const handleNewTeamSubmit = (e) => {
    e.preventDefault();
    if (!newTeamName) {
      alert("Please provide a team name.");
      return;
    }
    onNewTeamCreated({
      nome: newTeamName,
      primaryColor: newTeamPrimaryColor,
    });

    setNewTeamName("");
    setNewTeamPrimaryColor("#FFFFFF");
  };

  const chartData = {
    labels: teams.map((team) => team.nome),
    datasets: [
      {
        label: "Number of Collaborators",
        data: teams.map(
          (team) =>
            colaboradores.filter(
              (colaborador) => colaborador.team === team.nome
            ).length
        ),
        borderColor: teams.map((team) => team.primaryColor),
        backgroundColor: "rgba(0, 0, 0, 0)",
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: teams.map((team) => team.primaryColor),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Collaborators per Team" },
    },
  };

  return (
    <motion.div
      className="dashboard-page"
      style={{
        backgroundColor: `var(--background-color)`,
        color: `var(--text-color)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 style={{ color: "var(--text-color)" }}>Dashboard</h1>
      <motion.div
        className="chart-container"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Line data={chartData} options={chartOptions} />
      </motion.div>
      <motion.section
        className="form-container"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="formulario">
          <h2>Add a Collaborator</h2>
          <InputText
            mandatory
            label="Name"
            placeholder="Write your name"
            value={name}
            change={setName}
          />
          <InputText
            mandatory
            label="Position"
            placeholder="Write your position"
            value={cargo}
            change={setCargo}
          />
          <InputText
            label="Image URL"
            placeholder="Enter image URL (optional)"
            value={image}
            change={setImage}
          />
          <List
            mandatory
            label="Teams"
            itens={teams.map((team) => team.nome)}
            change={setTeamSelected}
            value={teamSelected}
          />
          <Button>Create Collaborator</Button>
        </form>

        <form onSubmit={handleNewTeamSubmit} className="formulario">
          <h2>Add a New Team</h2>
          <InputText
            mandatory
            label="Team Name"
            placeholder="Enter team name"
            value={newTeamName}
            change={setNewTeamName}
          />
          <div className="color-picker">
            <label>
              Primary Color:
              <input
                type="color"
                value={newTeamPrimaryColor}
                onChange={(e) => setNewTeamPrimaryColor(e.target.value)}
              />
            </label>
          </div>
          <Button>Add Team</Button>
        </form>
      </motion.section>
    </motion.div>
  );
};

export default Dashboard;
