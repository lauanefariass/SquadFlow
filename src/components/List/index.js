import "./List.css";

const List = ({ label, itens, change, mandatory }) => {
  const handleChange = (e) => {
    change(e.target.value); // Atualiza o time selecionado
  };

  return (
    <div className="list">
      <label>{label}</label>
      <select required={mandatory} onChange={handleChange}>
        <option value="">Select a Team</option>
        {itens.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default List;
