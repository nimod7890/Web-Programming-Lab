const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/class/:className", (req, res) => {
  const className = req.params.className;
  const sql = `SELECT team_name, team_member, team_number, hashtag_main, hashtag_custom_a, hashtag_custom_b, hashtag_custom_c,project_name,project_thumbnail_url,project_id  FROM project WHERE class_name = ?`;
  db.query(sql, [className], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/tag/:tagId", (req, res) => {
  const tagId = req.params.tagId;
  const sql =
    "SELECT team_name, team_member, team_number, hashtag_main, hashtag_custom_a, hashtag_custom_b, hashtag_custom_c, project_name,like_cnt,project_thumbnail_url,project_id FROM project WHERE hashtag_main = ?";
  db.query(sql, [tagId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/project/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  const sql = "SELECT * FROM project WHERE project_id = ?";
  db.query(sql, [projectId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
