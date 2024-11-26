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
    </section>
  );
};

export default Form;
