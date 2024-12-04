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
          {
            id: 3,
            nome: "UI/UX Designer",
            primaryColor: "#8E44AD",
            secondaryColor: "#1D1D2C",
          },
          {
            id: 4,
            nome: "Data Science",
            primaryColor: "#3498DB",
            secondaryColor: "#1D1D2C",
          },
        ];
  });

  const [colaboradores, setColaboradores] = useState(() => {
    const savedColaboradores = localStorage.getItem("colaboradores");
    return savedColaboradores ? JSON.parse(savedColaboradores) : [];
  });

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
  };

  const addNewTeam = (newTeam) => {
    setTeams((prev) => {
      const updatedTeams = [...prev, { ...newTeam, id: prev.length + 1 }];
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      return updatedTeams;
    });
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
              deleteColaborador={deleteColaborador}
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
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
