import "../css/Class.scss";
import { useParams } from "react-router-dom";
import Grid from "./Grid/Grid";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function Class() {
  const classId = useParams().classId;
  const [projects, setprojects] = useState([]);
  const projectList = useRef(projects);
  const projectRandList = useRef(projects);
  // const [checked, setChecked] = useState(false);

  function handleChecked({ target }) {
    target.checked
      ? setprojects(projectList.current)
      : setprojects(projectRandList.current);
  }

  useEffect(() => {
    axios
      .get("/api/class", {
        params: { class: classId }
      })
      .then(function (response) {
        projectList.current = response.data.projects;
        projectRandList.current = response.data.projectsRand;
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
