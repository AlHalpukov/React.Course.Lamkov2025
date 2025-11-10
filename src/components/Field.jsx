const Field = (props) => {
  const {
    label,
    className = "",
    id,
    type = "text",
    onInput,
    value,
    ref,
  } = props;
  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="field__input"
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        onInput={onInput}
        value={value}
        ref={ref}
      />
    </div>
  );
};

export default Field;
