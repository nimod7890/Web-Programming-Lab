import "../scss/Tag.scss";
import Grid from "./Class/Grid";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TagBtn from "./Tag/Tag";

function Tag() {
  //tag list
  const TagList = [
    "게임",
    "패션",
    "환경",
    "의료",
    "음악",
    "운동&스포츠",
    "요리",
    "교육",
    "영화&도서",
    "생활",
    "AI",
    "여행",
    "힐링",
    "비즈니스",
    "커뮤니케이션",
    "쇼핑",
    "지도",
    "창작",
    "컴퓨팅",
    "보안",
    "편의&도구",
    "취업",
    "기타"
  ];

  //change tag color if onclick
  const [clicked, setClicked] = useState();
  const handleOnClick = (event) => {
    if (clicked !== undefined) {
      clicked.classList.remove("onClick");
    }
    event.target.classList.toggle("onClick");
    setClicked(event.target);
  };

  /**show projects including onclick tag */
  const tagId = useParams().tagId;
  const [projects, setprojects] = useState([]);
  const projectList = useRef(projects);
  //get project list info
  useEffect(() => {
    axios
      .get(`/api/tag/${tagId}`)
      .then(function (response) {
        projectList.current = response.data;
        setprojects(projectList.current);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [tagId]);

  return (
    <div className="Tag">
      <div className="TagList">
        {TagList.map((Tag, idx) => (
          <TagBtn
            value={Tag}
            key={`Tag${idx}`}
            link={`/tag/${Tag}`}
            onClick={(event) => handleOnClick(event)}
          />
        ))}
      </div>
      <div className="Class">
        <div className="ClassGridWrapper">
          {projects.map((project) => {
            return (
              <Grid project={project} key={`projectId${project.project_id}`} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Tag;
