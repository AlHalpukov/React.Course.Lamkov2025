const Button = (props) => {
  const {
    className = "",
    type = "button",
    children,
    onClick,
    isDisabled,
  } = props;

  return (
    <button
      className={`${className} button`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
