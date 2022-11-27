import "../scss/Class.scss";
import { useParams } from "react-router-dom";
import Grid from "./Class/Grid";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function Class() {
  const [projects, setprojects] = useState([]);
  const projectList = useRef(projects);
  const projectRandList = useRef(projects);

  //handle to sort
  function handleChecked({ target }) {
    target.checked
      ? setprojects(projectList.current)
      : setprojects(projectRandList.current.sort(() => Math.random() - 0.5));
  }

  function shuffleArray(array) {
    const newArray = JSON.parse(JSON.stringify(array)); //deep copy
    newArray.sort(() => Math.random() - 0.5); //random sort
    return newArray;
  }
  //set project list in the class
  const classId = useParams().classId;
  useEffect(() => {
    axios
      .get(`/api/class/${classId}`)
      .then(function (response) {
        projectList.current = response.data;
        projectRandList.current = shuffleArray(response.data);
        setprojects(projectRandList.current);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [classId]);

  return (
    <div className="Class">
      <div className="ClassBtnWrapper">
        <div>
          <input
            type="checkbox"
            id="Switch"
            onChange={(e) => handleChecked(e)}
          />
          <label htmlFor="Switch" className="SwitchLabel">
            <span className="SwitchBtn"></span>
          </label>
        </div>
        <p>팀번호 순으로 보기</p>
      </div>
      <div className="ClassGridWrapper">
        {projects.map((project) => {
          return (
            <Grid project={project} key={`projectId${project.project_id}`} />
          );
        })}
      </div>
    </div>
  );
}

export default Class;
