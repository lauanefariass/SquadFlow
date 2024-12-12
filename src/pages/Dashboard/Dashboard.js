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
import { Line, Pie } from "react-chartjs-2";
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
  const [showCollaboratorModal, setShowCollaboratorModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [team, setTeam] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamColor, setNewTeamColor] = useState("#c21858");

  const handleAddCollaborator = () => {
    if (!name || !role || !team) {
      alert("Please fill all fields.");
      return;
    }
    aoColaboradorCadastrado({ name, role, image, team });
    setShowCollaboratorModal(false);
    setName("");
    setRole("");
    setImage("");
    setTeam("");
  };

  const handleAddTeam = () => {
    if (!newTeamName) {
      alert("Please provide a team name.");
      return;
    }
    onNewTeamCreated({ nome: newTeamName, primaryColor: newTeamColor });
    setShowTeamModal(false);
    setNewTeamName("");
    setNewTeamColor("#c21858");
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
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="dashboard-title">Dashboard</h1>

      <motion.div
        className="chart-container"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Line data={chartData} />
      </motion.div>

      <motion.div
        className="pie-chart-container"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Pie data={pieChartData} />
      </motion.div>

      <div className="button-container">
        <Button
          variant="primary"
          onClick={() => setShowCollaboratorModal(true)}
        >
          Add Collaborator
        </Button>
        <Button variant="secondary" onClick={() => setShowTeamModal(true)}>
          Add Team
        </Button>
      </div>

      {/* Collaborator Modal */}
      <Modal
        show={showCollaboratorModal}
        onHide={() => setShowCollaboratorModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Collaborator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="modal-label">Name</label>
          <input
            type="text"
            className="modal-input"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="modal-label">Role</label>
          <input
            type="text"
            className="modal-input"
            placeholder="Enter role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <label className="modal-label">Image URL</label>
          <input
            type="text"
            className="modal-input"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <label className="modal-label">Team</label>
          <select
            className="modal-select"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            <option value="">Select a team</option>
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
            onClick={() => setShowCollaboratorModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCollaborator}>
            Add Collaborator
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Team Modal */}
      <Modal
        show={showTeamModal}
        onHide={() => setShowTeamModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="modal-label">Team Name</label>
          <input
            type="text"
            className="modal-input"
            placeholder="Enter team name"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
          <label className="modal-label">Team Color</label>
          <input
            type="color"
            className="modal-color-picker"
            value={newTeamColor}
            onChange={(e) => setNewTeamColor(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTeamModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTeam}>
            Add Team
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default Dashboard;
