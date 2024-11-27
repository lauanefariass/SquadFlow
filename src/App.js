import "./App.css";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Team from "./components/team";
import Banner from "./components/banner/Banner";
import Form from "./components/Form";
import Footer from "./components/rodape/Footer";

const App = () => {
  const [teams, setTeams] = useState([
    {
      id: uuidv4(),
      nome: "Programming",
      primaryColor: "#FF4C4C",
      secondaryColor: "#1D1D2C",
    },
    {
      id: uuidv4(),
      nome: "Front-End",
      primaryColor: "#4CC9F0",
      secondaryColor: "#1D1D2C",
    },
    {
      id: uuidv4(),
      nome: "Back-End",
      primaryColor: "#FF5D8F",
      secondaryColor: "#1D1D2C",
    },
    {
      id: uuidv4(),
      nome: "DevOps",
      primaryColor: "#2ECC71",
      secondaryColor: "#1D1D2C",
    },
    {
      id: uuidv4(),
      nome: "UI/UX Designer",
      primaryColor: "#FFD700",
      secondaryColor: "#1D1D2C",
    },
    {
      id: uuidv4(),
      nome: "Mobile",
      primaryColor: "#FFA500",
      secondaryColor: "#1D1D2C",
    },
  ]);

  const [colaboradores, setColaboradores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const addColaborador = (colaborador) =>
    setColaboradores((prev) => [...prev, { ...colaborador, id: uuidv4() }]);

  const deleteColaborador = (colaboradorId) =>
    setColaboradores((prev) =>
      prev.filter((colaborador) => colaborador.id !== colaboradorId)
    );

  const handleColorChange = (teamName, newPrimary, newSecondary) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.nome === teamName
          ? { ...team, primaryColor: newPrimary, secondaryColor: newSecondary }
          : team
      )
    );
  };

  const handleShowForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const addNewTeam = (newTeam) => {
    setTeams((prev) => [...prev, { ...newTeam, id: uuidv4() }]);
  };

  return (
    <div className="App">
      <Banner onShowForm={handleShowForm} />
      <div ref={formRef}>
        {showForm && (
          <Form
            aoColaboradorCadastrado={addColaborador}
            teams={teams.map((team) => team.nome)}
            onNewTeamCreated={addNewTeam}
          />
        )}
      </div>
      {teams
        .filter((team) =>
          colaboradores.some((colaborador) => colaborador.team === team.nome)
        ) 
        .map(({ id, nome, primaryColor, secondaryColor }) => {
          const teamColaboradores = colaboradores.filter(
            (colaborador) => colaborador.team === nome
          );
          return (
            <Team
              key={id}
              name={nome}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              colaboradores={teamColaboradores}
              onDelete={(colaboradorId) => deleteColaborador(colaboradorId)}
              onColorChange={handleColorChange}
            />
          );
        })}
      <Footer />
    </div>
  );
};

export default App;
