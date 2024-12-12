import React from "react";
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
import { Button } from "react-bootstrap";
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
        borderColor: teams.map((team) => team.primaryColor),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#c21858" } },
      title: {
        display: true,
        text: "Collaborators per Team",
        color: "#c21858",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#c21858",
        },
      },
      y: {
        ticks: {
          color: "#c21858",
        },
      },
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
      <h1 className="dashboard-title">Dashboard</h1>

      <motion.div
        className="chart-container"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Line data={chartData} options={chartOptions} />
      </motion.div>

      <motion.div
        className="pie-chart-container"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Pie
          data={pieChartData}
          options={{ plugins: { legend: { labels: { color: "#c21858" } } } }}
        />
      </motion.div>

      <div className="button-container">
        <Button
          variant="primary"
          className="btn-primary"
          onClick={() =>
            alert("Add Collaborator functionality to be implemented")
          }
        >
          Add Collaborator
        </Button>
        <Button
          variant="secondary"
          className="btn-secondary"
          onClick={() => alert("Add Team functionality to be implemented")}
        >
          Add Team
        </Button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
