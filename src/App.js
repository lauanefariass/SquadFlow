import "./App.css";
import { useState } from "react";
import Team from "./components/team";
import Banner from "./components/banner/Banner";
import Form from "./components/Form";
import Footer from "./components/rodape/Footer";

const App = () => {
  const Teams = [
    { nome: "Programming", primaryColor: "#FF4C4C", secondaryColor: "#1D1D2C" },
    { nome: "Front-End", primaryColor: "#4CC9F0", secondaryColor: "#1D1D2C" },
    { nome: "Back-End", primaryColor: "#FF5D8F", secondaryColor: "#1D1D2C" },
    { nome: "DevOps", primaryColor: "#2ECC71", secondaryColor: "#1D1D2C" },
    {
      nome: "UI/UX Designer",
      primaryColor: "#FFD700",
      secondaryColor: "#1D1D2C",
    },
    { nome: "Mobile", primaryColor: "#FFA500", secondaryColor: "#1D1D2C" },
  ];

  const [colaboradores, setColaboradores] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addColaborador = (colaborador) =>
    setColaboradores((prev) => [...prev, colaborador]);

  const deleteColaborador = (teamName, index) =>
    setColaboradores((prev) =>
      prev.filter(
        (colaborador, i) => colaborador.team !== teamName || i !== index
      )
    );

  return (
    <div className="App">
      <Banner onShowForm={() => setShowForm(true)} />
      {showForm && (
        <Form
          aoColaboradorCadastrado={addColaborador}
          teams={Teams.map((team) => team.nome)}
        />
      )}
      {Teams.map(({ nome, primaryColor, secondaryColor }) => {
        const teamColaboradores = colaboradores.filter(
          (colaborador) => colaborador.team === nome
        );
        return (
          teamColaboradores.length > 0 && (
            <Team
              key={nome}
              name={nome}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              colaboradores={teamColaboradores}
              onDelete={(index) => deleteColaborador(nome, index)}
            />
          )
        );
      })}
      <Footer />
    </div>
  );
};

export default App;
