import { React, useMemo } from "react";
import { useNavigate } from "react-router";
import ReactWordcloud from "react-wordcloud";
import "../css/Main.css";

function WordCloud() {
  const navigate = useNavigate();
  const callbacks = useMemo(() => {
    return {
      onWordClick: (key) => {
        if(key.text === '성균관대' || key.text === '러닝페어' || key.text === '2022' || key.text === '문제해결' || key.text === '알고리즘'){
          return navigate(`/tag`)
        }
        else navigate(`/tag/${key.text}`)
      }
    };
  }, [navigate]);
  const options = useMemo(() => {
    if (window.matchMedia("(max-width:768px)").matches)
      return {
        enableTooltip: false,
        deterministic: false,
        fontFamily: "헤드라인",
        fontSizes: [20, 80],
        fontStyle: "normal",
        fontWeight: "900",
        padding: 2,
        rotations: 2,
        rotationAngles: [0, 90],
        scale: "log",
        spiral: "rectangular"
      };
    return {
      enableTooltip: false,
      deterministic: false,
      fontFamily: "헤드라인",
      fontSizes: [50, 150],
      fontStyle: "normal",
      fontWeight: "900",
      padding: 2,
      rotations: 1,
      rotationAngles: [0, 0],
      scale: "log",
      spiral: "rectangular"
    };
  }, []);
  // var w=window.innerWidth, h=window.innerHeight;
  const size = useMemo(() => {
    if (window.matchMedia("(max-width:768px)").matches)
      return [window.innerWidth * 0.7, window.innerHeight * 0.6];
    return [900, 650];
  }, []);
  const words = useMemo(() => {
    return [
      {
        text: "편의&도구",
        value: 165
      },
      {
        text: "취업",
        value: 5
      },
      {
        text: "기타",
        value: 9
      },
      {
        text: "게임",
        value: 42
      },
      {
        text: "패션",
        value: 24
      },
      {
        text: "환경",
        value: 36
      },
      {
        text: "의료",
        value: 10
      },
      {
        text: "음악",
        value: 6
      },
      {
        text: "운동&스포츠",
        value: 19
      },
      {
        text: "요리",
        value: 33
      },
      {
        text: "교육",
        value: 40
      },
      {
        text: "영화&도서",
        value: 15
      },
      {
        text: "생활",
        value: 117
      },
      {
        text: "AI",
        value: 9
      },
      {
        text: "여행",
        value: 19
      },
      {
        text: "힐링",
        value: 8
      },
      {
        text: "비즈니스",
        value: 4
      },
      {
        text: "커뮤니케이션",
        value: 13
      },
      {
        text: "쇼핑",
        value: 10
      },
      {
        text: "지도",
        value: 24
      },
      {
        text: "창작",
        value: 2
      },
      {
        text: "컴퓨팅",
        value: 3
      },
      {
        text: "보안",
        value: 6
      },
      {
        text: "러닝페어",
        value: 100
      },
      {
        text: "성균관대",
        value: 70
      },
      {
        text: "문제해결",
        value: 30
      },
      {
        text: "알고리즘",
        value: 30
      },
      {
        text: "2022",
        value: 10
      }
    ];
  }, []);

  return (
    <div className="WordCloud Font">
      <ReactWordcloud
        className="WordCloud Font"
        callbacks={callbacks}
        options={options}
        size={size}
        words={words}
      />
    </div>
  );
}

export default WordCloud;
