const Button = (props) => {
  const { className = "", type = "button", children, onClick } = props;

  return (
    <button className={`${className} button`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
