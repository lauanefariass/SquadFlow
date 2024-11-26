import "./App.css";
import { useState, useEffect } from "react";
import Team from "./components/team";
import Banner from "./components/banner/Banner";
import Form from "./components/Form";
import Footer from "./components/rodape/Footer";

const App = () => {
  const Teams = [
    { nome: "Programming", primaryColor: "#3B82F6", secondaryColor: "#DCEFFF" },
    { nome: "Front-End", primaryColor: "#F97316", secondaryColor: "#FFEAD1" },
    { nome: "Back-End", primaryColor: "#10B981", secondaryColor: "#D1FAE5" },
    { nome: "DevOps", primaryColor: "#EF4444", secondaryColor: "#FEE2E2" },
    {
      nome: "UI/UX Designer",
      primaryColor: "#9333EA",
      secondaryColor: "#EDE9FE",
    },
    { nome: "Mobile", primaryColor: "#F59E0B", secondaryColor: "#FEF3C7" },
  ];

  const [colaboradores, setColaboradores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const addColaborador = (colaborador) => {
    setColaboradores((prev) => [...prev, colaborador]);
  };

  const deleteColaborador = (teamName, index) => {
    setColaboradores((prev) =>
      prev.filter(
        (colaborador, i) => !(colaborador.team === teamName && i === index)
      )
    );
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Banner />
          <button
            className="get-started"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Close Form" : "Get Started"}
          </button>
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
        </>
      )}
    </div>
  );
};

export default App;
