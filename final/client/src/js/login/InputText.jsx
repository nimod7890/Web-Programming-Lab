function InputText({
  id,
  nameValue,
  onNameChange,
  studentIdValue,
  onStudentIdChange,
  majorValue,
  onMajorChange
}) {
  if (id === "inputStudent") {
    return (
      <div id={id} className="inputTextShow">
        <div className="input-box">
          <input
            className="textInput"
            id={id + "Name"}
            type="text"
            value={nameValue}
            onChange={onNameChange}
            name={id + "Name-input"}
            placeholder="Name"
          />
          <label
            className="textLabel"
            id={id + "Name-label"}
            htmlFor={id + "Name-input"}
          >
            Name
          </label>
        </div>
        <div className="input-box">
          <input
            className="textInput"
            maxLength="10"
            id={id + "StudentId"}
            type="text"
            value={studentIdValue}
            onChange={onStudentIdChange}
            name={id + "StudentId-input"}
            placeholder="Student Id"
          />
          <label
            className="textLabel"
            id={id + "StudentId-label"}
            htmlFor={id + "StudentId-input"}
          >
            Student Id
          </label>
        </div>
        <div className="input-box">
          <input
            className="textInput"
            id={id + "Major"}
            type="text"
            value={majorValue}
            onChange={onMajorChange}
            name={id + "Major-input"}
            placeholder="Major"
          />
          <label
            className="textLabel"
            id={id + "Major-label"}
            htmlFor={id + "Major-input"}
          >
            Major
          </label>
        </div>
      </div>
    );
  } else {
    return (
      <div id={id} className="inputTextShow">
        <div className="input-box">
          <input
            className="textInput"
            id={id + "Name"}
            type="text"
            value={nameValue}
            onChange={onNameChange}
            name={id + "Name-input"}
            placeholder="Name"
          />
          <label
            className="textLabel"
            id={id + "Name-label"}
            htmlFor={id + "Name-input"}
          >
            Name
          </label>
        </div>
      </div>
    );
  }
}
export default InputText;
