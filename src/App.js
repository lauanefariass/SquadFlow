import "./App.css";
import { useState, useEffect } from "react";
import Banner from "./components/banner/Banner";
import Form from "./components/Form";
import Team from "./components/team";
import Footer from "./components/rodape/Footer";

function App() {
  const Teams = [
    {
      nome: "Programming",
      primaryColor: "#3B82F6",
      secondaryColor: "#DCEFFF",
    },
    {
      nome: "Front-End",
      primaryColor: "#F97316",
      secondaryColor: "#FFEAD1",
    },
    {
      nome: "Back-End",
      primaryColor: "#10B981",
      secondaryColor: "#D1FAE5",
    },
    {
      nome: "DevOps",
      primaryColor: "#EF4444",
      secondaryColor: "#FEE2E2",
    },
    {
      nome: "UI/UX Designer",
      primaryColor: "#9333EA",
      secondaryColor: "#EDE9FE",
    },
    {
      nome: "Mobile",
      primaryColor: "#F59E0B",
      secondaryColor: "#FEF3C7",
    },
  ];

  const [colaboradores, setColaboradores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simula o carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Desativa o loader após 2 segundos
    }, 2000);

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
  }, []);

  const aoNovoColaboradorAdicionado = (colaborador) => {
    setColaboradores([...colaboradores, colaborador]);
    setShowForm(false); // Esconde o formulário após adicionar um colaborador
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm); // Alterna entre mostrar/esconder o formulário
  };

  return (
    <div className="App">
      {/* Loader */}
      {loading && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}

      {/* Conteúdo principal */}
      {!loading && (
        <>
          <Banner />
          <button className="get-started" onClick={toggleFormVisibility}>
            {showForm ? "Close Form" : "Get Started"}
          </button>
          {showForm && (
            <Form
              aoColaboradorCadastrado={aoNovoColaboradorAdicionado}
              teams={Teams.map((team) => team.nome)}
            />
          )}
          {Teams.map((team) => {
            const teamColaboradores = colaboradores.filter(
              (colaborador) => colaborador.team === team.nome
            );
            return (
              teamColaboradores.length > 0 && (
                <Team
                  key={team.nome}
                  name={team.nome}
                  primaryColor={team.primaryColor}
                  secondaryColor={team.secondaryColor}
                  colaboradores={teamColaboradores}
                />
              )
            );
          })}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
