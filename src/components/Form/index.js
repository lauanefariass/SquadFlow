import React, { useState } from "react";
import "./Form.css";
import InputText from "../inputText";
import List from "../List";
import Button from "../button";

const Form = ({ aoColaboradorCadastrado, teams }) => {
  const [name, setName] = useState("");
  const [cargo, setCargo] = useState("");
  const [image, setImage] = useState("");
  const [teamSelected, setTeamSelected] = useState("");

  const Save = (e) => {
    e.preventDefault();

    const novoColaborador = {
      name,
      cargo,
      image,
      team: teamSelected, // Time selecionado
    };

    aoColaboradorCadastrado(novoColaborador); // Adiciona o colaborador

    // Limpa os campos do formulário após o envio
    setName("");
    setCargo("");
    setImage("");
    setTeamSelected("");
  };

  return (
    <section className="Form-conteiner">
      <form onSubmit={Save}>
        <h2>Add a Person</h2>
        <InputText
          mandatory={true}
          label="Name"
          placeholder="Write your Name"
          value={name}
          change={setName}
        />
        <InputText
          mandatory={true}
          label="Position"
          placeholder="Write your Position"
          value={cargo}
          change={setCargo}
        />
        <InputText
          mandatory={true}
          label="Image URL"
          placeholder="Enter image URL"
          value={image}
          change={setImage}
        />
        <List
          mandatory={true}
          label="Teams"
          itens={teams} // Lista os times no formulário
          change={setTeamSelected}
        />
        <Button>Create Card</Button>
      </form>
    </section>
  );
};

export default Form;
