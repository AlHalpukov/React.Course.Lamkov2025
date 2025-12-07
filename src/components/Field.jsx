const Field = (props) => {
  const {
    label,
    className = "",
    id,
    error,
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
        className={`field__input${error ? " is-invalid" : ""}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        onInput={onInput}
        value={value}
        ref={ref}
      />
      {error && (
        <span className="field__error" title={error}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Field;
