import "./List.css";

const List = (props) => {
  const handleChange = (e) => {
    props.change(e.target.value);
  };

  return (
    <div className="list">
      <label>{props.label}</label>
      <select required={props.mandatory} onChange={handleChange}>
        <option value="">Select a Team</option>
        {props.itens.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default List;
