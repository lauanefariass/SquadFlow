import React, { useState } from "react";
import "./Form.css";
import InputText from "../inputText";
import List from "../List";
import Button from "../button";

const Form = ({ aoColaboradorCadastrado, teams, onNewTeamCreated }) => {
  const [name, setName] = useState("");
  const [cargo, setCargo] = useState("");
  const [image, setImage] = useState("");
  const [teamSelected, setTeamSelected] = useState("");

  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamPrimaryColor, setNewTeamPrimaryColor] = useState("#FFFFFF");
  const [newTeamSecondaryColor, setNewTeamSecondaryColor] = useState("#000000");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !cargo || !teamSelected) {
      alert("Please fill in all required fields.");
      return;
    }

    const novoColaborador = {
      name,
      cargo,
      image: image || "https://via.placeholder.com/150",
      team: teamSelected,
    };

    aoColaboradorCadastrado(novoColaborador);

    setName("");
    setCargo("");
    setImage("");
    setTeamSelected("");
  };

  const handleNewTeamSubmit = (e) => {
    e.preventDefault();

    if (!newTeamName) {
      alert("Please provide a team name.");
      return;
    }

    const newTeam = {
      nome: newTeamName,
      primaryColor: newTeamPrimaryColor,
      secondaryColor: newTeamSecondaryColor,
    };

    onNewTeamCreated(newTeam);

    setNewTeamName("");
    setNewTeamPrimaryColor("#FFFFFF");
    setNewTeamSecondaryColor("#000000");
  };

  return (
    <section className="Form-conteiner">
      <form onSubmit={handleSubmit}>
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
          mandatory={false}
          label="Image URL"
          placeholder="Enter image URL (optional)"
          value={image}
          change={setImage}
        />
        <List
          mandatory={true}
          label="Teams"
          itens={teams}
          change={setTeamSelected}
          value={teamSelected}
        />
        <Button>Create Card</Button>
      </form>

      <form onSubmit={handleNewTeamSubmit} className="new-team-form">
        <h2>Add a New Team</h2>
        <InputText
          mandatory={true}
          label="Team Name"
          placeholder="Enter team name"
          value={newTeamName}
          change={setNewTeamName}
        />
        <div className="color-picker">
          <label>
            Primary Color:
            <input
              type="color"
              value={newTeamPrimaryColor}
              onChange={(e) => setNewTeamPrimaryColor(e.target.value)}
            />
          </label>
          <label>
            Secondary Color:
            <input
              type="color"
              value={newTeamSecondaryColor}
              onChange={(e) => setNewTeamSecondaryColor(e.target.value)}
            />
          </label>
        </div>
        <Button>Add Team</Button>
      </form>
    </section>
  );
};

export default Form;
