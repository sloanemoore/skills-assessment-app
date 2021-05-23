import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container'
import "./App.css";
import SectionBox from "./SectionBox.js";
import Header from "./Header.js";

function App() {

  const [progressList, setProgressList] = useState(() => {
    const progressList = JSON.parse(localStorage.getItem("progressList"));
    if (progressList) {
      return progressList;
    } else {
      return [];
    }
  });

  useEffect(() => {
    if (progressList.length === 0) {
      fetch("https://raw.githubusercontent.com/sloanemoore/skills-progress-tracker-app/main/progress-tracker-app/public/data.json")
      .then(response => response.json())
      .then(data => {
        console.log("progressList: ", data);
        console.log(data["progressList"]);
        console.log(typeof data["progressList"]);
        console.log(Array.isArray(data["progressList"]));
        setProgressList(data["progressList"]);
      })
      .catch(error => {
        console.log(error);
        console.log({progressList})
        setProgressList([]);
      });
    } 
  });


  // const [progressList, setProgressList] = useState([]);

  // const [progressList, setProgressList] = useState(() => {
  //   let progressList = JSON.parse(localStorage.getItem("progressList"));
  //   if (progressList) {
  //     console.log(progressList);
  //     return progressList;
  //   } else {
  //     fetch("https://raw.githubusercontent.com/sloanemoore/skills-progress-tracker-app/main/progress-tracker-app/public/data.json")
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log("progressList: ", data);
  //       console.log(data["progressList"]);
  //       progressList = data["progressList"];
  //       // return data["progressList"]
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       console.log({progressList})
  //       progressList = []
  //       // return [];
  //     });
  //   }
  //   return progressList;
  // });

  // const [progressList, setProgressList] = useState(() => {
  //   const progressList = JSON.parse(localStorage.getItem("progressList"));
  //   if (progressList) {
  //     return progressList;
  //   // } else {
  //   //   return []
  //   // }
  //   } else {
  //         fetch("https://raw.githubusercontent.com/sloanemoore/skills-progress-tracker-app/main/progress-tracker-app/public/data.json")
  //         .then(response => response.json())
  //         .then(data => {
  //           console.log("progressList: ", data);
  //           console.log(data["progressList"]);
  //           console.log(typeof data["progressList"]);
  //           console.log(Array.isArray(data["progressList"]));
  //           return data["progressList"];
  //         })
  //         .catch(error => {
  //           console.log(error);
  //           console.log({progressList})
  //           return [];
  //         });
  //       }
  // });

  // useEffect(() => console.log("this is the progressList: ", progressList), [progressList]);

  const [key, setKey] = useState(9); // you will need to change this depending on the data.json file





  useEffect(
    () => localStorage.setItem("progressList", JSON.stringify(progressList)),
    [progressList]
  );

  useEffect(
    () => localStorage.setItem("key", JSON.stringify(key)),
    [key]
  );

  

  function handleAddSectionButtonClick() {
    const newSection = { key: key, sectionName: "", skills: [] };
    setProgressList([newSection, ...progressList]);
    setKey((prevKey) => prevKey + 1);
  }


  function handleDeleteSectionButtonClick(section) {
    const sectionKey = section.key;
    const tempProgressList = progressList.filter(
      (section) => section.key !== sectionKey
    );
    setProgressList(tempProgressList);
  }

  function handleAddSkillButtonClick(section) {
    const sectionKey = section.key;
    const newSkill = { key: key, skillName: "", skillLevel: -1 };
    const tempSectionSkills = [...section.skills, newSkill];
    const newSection = {
      key: section.key,
      sectionName: section.sectionName,
      skills: tempSectionSkills,
    };
    const tempProgressList = progressList.map((section) => {
      if (section.key === sectionKey) {
        return newSection;
      }
      return section;
    });
    setProgressList(tempProgressList);
    setKey((prevKey) => prevKey + 1);
  }

  function handleDeleteSkillButtonClick(section, skill) {
    const skillKey = skill.key;
    const sectionKey = section.key;
    const tempSkillSection = section.skills.filter(
      (skill) => skill.key !== skillKey
    );
    const tempSection = {
      key: section.key,
      sectionName: section.name,
      skills: tempSkillSection,
    };
    const tempProgressList = progressList.map((section) => {
      console.log(
        "current section key: ",
        section.key,
        "sectionKey to match: ",
        sectionKey
      );
      if (section.key === sectionKey) return tempSection;
      return section;
    });
    setProgressList(tempProgressList);
  }

  return (
    <div className="App">
      <Container>
        <Header handleAddSectionButtonClick={handleAddSectionButtonClick} />
        <SectionBox
          progressList={progressList}
          setProgressList={setProgressList}
          handleAddSkillButtonClick={handleAddSkillButtonClick}
          handleDeleteSectionButtonClick={handleDeleteSectionButtonClick}
          handleDeleteSkillButtonClick={handleDeleteSkillButtonClick}
        />
      </Container>
    </div>
  );
}

export default App;
