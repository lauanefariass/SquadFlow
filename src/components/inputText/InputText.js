import "./InputText.css";

const InputText = (props) => {
  const typing = (e) => {
    const newValue = e.target.value;
    props.change(newValue);
    console.log(newValue);
  };

  return (
    <div className="text">
      <label>{props.label}</label>
      <input
        value={props.value}
        onChange={typing}
        required={props.mandatory}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputText;
