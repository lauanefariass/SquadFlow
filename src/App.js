import { useState } from "react";
import Banner from "./components/banner/Banner";
import Form from "./components/Form";
import Team from "./components/team";

function App() {
  const [colaboradores, setColaboradores] = useState([]);

  const aoNovoColaboradorAdicionado = (colaborador) => {
    setColaboradores([...colaboradores, colaborador]);
  };

  return (
    <div className="App">
      <Banner />
      <Form aoColaboradorCadastrado={aoNovoColaboradorAdicionado} />
      <Team
        name="Programming"
        colaboradores={colaboradores.filter(
          (colaborador) => colaborador.team === "Programming"
        )}
      />
      <Team
        name="Front-End"
        colaboradores={colaboradores.filter(
          (colaborador) => colaborador.team === "Front-End"
        )}
      />
      <Team
        name="Back-End"
        colaboradores={colaboradores.filter(
          (colaborador) => colaborador.team === "Back-End"
        )}
      />
      <Team
        name="DevOps"
        colaboradores={colaboradores.filter(
          (colaborador) => colaborador.team === "DevOps"
        )}
      />
      <Team
        name="UI/UX Designer"
        colaboradores={colaboradores.filter(
          (colaborador) => colaborador.team === "UI/UX Designer"
        )}
      />

      <Team
        name="Mobile"
        colaboradores={colaboradores.filter(
          (colaborador) => colaborador.team === "Mobile"
        )}
      />
    </div>
  );
}

export default App;
