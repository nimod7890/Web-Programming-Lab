import { useContext } from "react";
import RadioContext from "./RadioContext";
function Radio({ id,value,onClick}) {
  const group=useContext(RadioContext)
  return (
    <label className="radioLabel" id={id}>
      <input 
        className="radioInput" 
        type="radio" 
        name="radio"
        value={value}
        checked={group.value !== undefined ? value === group.value : undefined}
        onChange={(e) => {
          group.onChange && group.onChange(e.target.value)
        }}
        onClick={onClick}
      />
      <span className="radioSpan">{value}</span>
    </label>
  );
}
export default Radio;
