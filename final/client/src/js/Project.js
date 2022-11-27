import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/Project.scss";
import axios from "axios";
import YouTube from "react-youtube";
import { useRef } from "react";

function Project() {
  /**show project detail page */
  const projectId = useParams().projectId;
  const project = useRef("");
  const [click, setClick] = useState(false);
  const [like, setLike] = useState(0);

  //get project info
  useEffect(() => {
    axios
      .get(`/api/project/${projectId}`)
      .then(function (response) {
        const data = response.data[0];
        project.current = {
          class_name: data.class_name,
          team_number: data.team_number,
          team_name: data.team_name,

          project_name: data.project_name,
          team_member: data.team_member,

          project_pdf_url: data.project_pdf_url,
          project_youtube_url: data.project_youtube_url.slice(-11),

          hashtag_main: data.hashtag_main,
          hashtag_custom_a: data.hashtag_custom_a,
          hashtag_custom_b: data.hashtag_custom_b,
          hashtag_custom_c: data.hashtag_custom_c,

          like_cnt: data.like_cnt
        };
        setLike(project.current.like_cnt);
        setClick(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [projectId]);

  //if 'like' button click
  async function handleOnclick() {
    if (click) {
      setLike(like - 1);
      setClick(false);
    } else {
      setLike(like + 1);
      setClick(true);
    }
  }

  var youtube_w = 700;
  var youtube_h = 350;
  return (
    <div className="Project">
      <div className="ProjectInfo">
        <h2>{project.current.project_name}</h2>
        <p id="ProjectMember">{project.current.team_member}</p>
        <div className="ProjectInfoWrapper">
          <button
            id="ProjectLike"
            onClick={() => {
              handleOnclick();
            }}
            className={`${click ? "" : "NoneClick"}`}
          >
            <div>
              <span className="material-symbols-outlined">favorite</span>
              <p>{like}</p>
            </div>
          </button>
          <p id="ProjectHashtag">
            <span>#{project.current.hashtag_main}</span>
            {project.current.hashtag_custom_a !== "-" ? (
              <span>#{project.current.hashtag_custom_a}</span>
            ) : (
              ""
            )}
            {project.current.hashtag_custom_b !== "-" ? (
              <span>#{project.current.hashtag_custom_b}</span>
            ) : (
              ""
            )}
            {project.current.hashtag_custom_c !== "-" ? (
              <span>#{project.current.hashtag_custom_c}</span>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
      <div className="ProjectContentWrapper">
        <div className="ProjectContent" id="ProjectYoutube">
          <p>YouTube</p>
          {project.current.project_youtube_url ? (
            <YouTube
              className="ProjectYoutube"
              videoId={project.current.project_youtube_url}
              opts={{
                width: youtube_w,
                height: youtube_h,
                playerVars: { autoPlay: 1, rel: 0, modestbranding: 1, start: 1 }
              }}
              onEnd={(e) => {
                e.target.stopVideo(0);
              }}
            />
          ) : (
            <embed
              className="ProjectPDF"
              src={project.current.project_pdf_url}
              type="application/pdf"
            />
          )}
        </div>
        <div className="ProjectContent" id="ProjectPDF">
          <p>PDF</p>
          <span>* 이 PDF는 데스크탑에서 보기를 권장합니다.</span>
          <br></br>
          <embed
            className="ProjectPDF"
            src={project.current.project_pdf_url}
            type="application/pdf"
          />
        </div>
      </div>
    </div>
  );
}

export default Project;
