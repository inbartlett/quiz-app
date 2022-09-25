function Field({ label, type, value, setValue }) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        type={
          type === "password"
            ? "password"
            : type === "checkbox"
            ? "checkbox"
            : "text"
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
export default Field;
