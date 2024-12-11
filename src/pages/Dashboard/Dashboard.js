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
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
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

  const [showAddCollaboratorModal, setShowAddCollaboratorModal] =
    useState(false);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);

  const handleAddCollaborator = () => {
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
    setShowAddCollaboratorModal(false);
  };

  const handleAddTeam = () => {
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
    setShowAddTeamModal(false);
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

  const pieChartData = {
    labels: teams.map((team) => team.nome),
    datasets: [
      {
        label: "Collaborator Distribution",
        data: teams.map(
          (team) =>
            colaboradores.filter(
              (colaborador) => colaborador.team === team.nome
            ).length
        ),
        backgroundColor: teams.map((team) => team.primaryColor),
        borderColor: "#fff",
        borderWidth: 2,
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

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Collaborator Distribution" },
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

      <motion.div
        className="chart-container"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Pie data={pieChartData} options={pieChartOptions} />
      </motion.div>

      <div className="button-container">
        <Button
          variant="primary"
          className="btn-primary"
          onClick={() => setShowAddCollaboratorModal(true)}
        >
          Add Collaborator
        </Button>
        <Button
          variant="secondary"
          className="btn-secondary"
          onClick={() => setShowAddTeamModal(true)}
        >
          Add Team
        </Button>
      </div>

      <Modal
        show={showAddCollaboratorModal}
        onHide={() => setShowAddCollaboratorModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Collaborator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="modal-input"
            placeholder="Write your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="modal-input"
            placeholder="Write your position"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
          <input
            type="text"
            className="modal-input"
            placeholder="Enter image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <select
            className="modal-select"
            value={teamSelected}
            onChange={(e) => setTeamSelected(e.target.value)}
          >
            <option value="" disabled>
              Select a Team
            </option>
            {teams.map((team) => (
              <option key={team.nome} value={team.nome}>
                {team.nome}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-secondary"
            onClick={() => setShowAddCollaboratorModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn-primary"
            onClick={handleAddCollaborator}
          >
            Add Collaborator
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAddTeamModal}
        onHide={() => setShowAddTeamModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a New Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="modal-input"
            placeholder="Enter team name"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
          <div className="color-picker">
            <label>
              Primary Color:
              <input
                type="color"
                className="modal-input"
                value={newTeamPrimaryColor}
                onChange={(e) => setNewTeamPrimaryColor(e.target.value)}
              />
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-secondary"
            onClick={() => setShowAddTeamModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn-primary"
            onClick={handleAddTeam}
          >
            Add Team
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default Dashboard;
