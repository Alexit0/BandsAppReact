import classes from "./Button.module.css";

const Button = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    props.setBand([props.id, props.name, props.year, props.country, props.bandImage]);
    console.log(props)
  };

  return (
    <button className={classes.button} onClick={submitHandler}>
      <span>{props.name}</span>
    </button>
  );
};

export default Button;
