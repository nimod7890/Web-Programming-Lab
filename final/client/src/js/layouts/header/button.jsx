function Button({ id, value, onClick, children }) {
  return (
    <div>
      <button id={id} onClick={onClick} className="button">
        <div>
          <span>{value}</span>
        </div>
      </button>
      {children}
    </div>
  );
}
export default Button;
