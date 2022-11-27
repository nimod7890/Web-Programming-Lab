import Footer from "./Footer";
import Header from "./Header";
import "../../scss/layouts/Layout.scss";
import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Main from "../Main";
import Awards from "../Awards";
import Tag from "../Tag";
import Class from "../Class";
import Project from "../Project";

const Layout = () => {
  //set title based on current url
  const loc = useLocation().pathname;
  const [title, setTitle] = useState(false);
  useEffect(() => {
    if (loc === "/main") {
      setTitle("");
    } else if (loc.slice(0, 4) === "/tag") {
      setTitle("해시태그");
    } else if (loc === "/awards") {
      setTitle("Awards");
    } else if (loc.length > 6 && loc.slice(0, 6) === "/class") {
      setTitle(loc.slice(7));
    } else if (loc.length > 8 && loc.slice(0, 8) === "/project") {
      //get project info
      axios
        .get(`/api/project/${loc.slice(9)}`)
        .then(function (response) {
          const project = response.data[0];
          setTitle(
            `[${project.team_number}] ${project.team_name}  (${project.class_name})`
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [loc]);

  return (
    <div>
      <Header />
      <div className="Main">
        <div className={`MainTitle ${title ? "" : "hidden"}`}>
          <div className="focus">{title}</div>
          <div className="mask">
            <div className="titleText">{title}</div>
          </div>
        </div>
        <div className="MainContent">
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/tag" element={<Tag />} />
            <Route path="/tag/:tagId" element={<Tag />} />
            <Route path="/class/:classId" element={<Class />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
