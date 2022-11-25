import { Link } from "react-router-dom";
function TagBtn({ value, onClick, link }) {
  return (
    <Link to={link}>
      <div className="TagBtn" value={value} onClick={onClick}>
        #{value}
      </div>
    </Link>
  );
}
export default TagBtn;
