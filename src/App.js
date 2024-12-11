import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/rodape/Footer";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Teams from "./pages/Teams/Teams";
import Settings from "./pages/Settings/Settings";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const AppContent = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "English"
  );

  const [teams, setTeams] = useState(() => {
    const savedTeams = localStorage.getItem("teams");
    return savedTeams
      ? JSON.parse(savedTeams)
      : [
          {
            id: 1,
            nome: "Front-End",
            primaryColor: "#4CC9F0",
            secondaryColor: "#1D1D2C",
          },
          {
            id: 2,
            nome: "Back-End",
            primaryColor: "#FF5D8F",
            secondaryColor: "#1D1D2C",
          },
        ];
  });

  const [colaboradores, setColaboradores] = useState(() => {
    const savedColaboradores = localStorage.getItem("colaboradores");
    return savedColaboradores ? JSON.parse(savedColaboradores) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [deleteAction, setDeleteAction] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem("colaboradores", JSON.stringify(colaboradores));
  }, [colaboradores]);

  const aoColaboradorCadastrado = (novoColaborador) => {
    setColaboradores((prev) => [
      ...prev,
      { ...novoColaborador, id: Date.now() },
    ]);
    setSuccessMessage("Collaborator added successfully!");
    setShowSuccessModal(true);
  };

  const addNewTeam = (newTeam) => {
    setTeams((prev) => {
      const updatedTeams = [...prev, { ...newTeam, id: prev.length + 1 }];
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      return updatedTeams;
    });
    setSuccessMessage("Team created successfully!");
    setShowSuccessModal(true);
  };

  const deleteTeam = (id) => {
    setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
  };

  const handleColorChange = (teamName, primaryColor) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.nome === teamName ? { ...team, primaryColor } : team
      )
    );
  };

  const deleteColaborador = (id) => {
    setColaboradores((prev) =>
      prev.filter((colaborador) => colaborador.id !== id)
    );
  };

  const confirmDelete = (action) => {
    setDeleteAction(() => () => action());
    setShowModal(true);
  };

  const location = useLocation();

  const translateNavbar = {
    English: ["Home", "Dashboard", "Teams", "Settings"],
    Portuguese: ["Início", "Painel", "Times", "Configurações"],
    Spanish: ["Inicio", "Panel", "Equipos", "Configuraciones"],
  };

  return (
    <div className={`App ${theme}`}>
      {location.pathname !== "/" && (
        <Navbar language={language} items={translateNavbar[language]} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              teams={teams}
              colaboradores={colaboradores}
              aoColaboradorCadastrado={aoColaboradorCadastrado}
              onNewTeamCreated={addNewTeam}
            />
          }
        />
        <Route
          path="/teams"
          element={
            <Teams
              teams={teams}
              colaboradores={colaboradores}
              onColorChange={handleColorChange}
              deleteColaborador={(id) =>
                confirmDelete(() => deleteColaborador(id))
              }
              deleteTeam={(id) => confirmDelete(() => deleteTeam(id))}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings
              currentTheme={theme}
              currentLanguage={language}
              onThemeChange={setTheme}
              onLanguageChange={setLanguage}
            />
          }
        />
      </Routes>
      {location.pathname !== "/" && <Footer />}

      {/* Delete Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteAction();
              setShowModal(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowSuccessModal(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
