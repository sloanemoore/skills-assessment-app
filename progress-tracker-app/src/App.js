import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SectionBox from "./SectionBox.js";
import Header from "./Header.js";

function App() {
  const [progressList, setProgressList] = useState([]);
  const [key, setKey] = useState(0);

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
      <Header handleAddSectionButtonClick={handleAddSectionButtonClick} />
      <SectionBox
        progressList={progressList}
        setProgressList={setProgressList}
        handleAddSkillButtonClick={handleAddSkillButtonClick}
        handleDeleteSectionButtonClick={handleDeleteSectionButtonClick}
        handleDeleteSkillButtonClick={handleDeleteSkillButtonClick}
      />
    </div>
  );
}

export default App;
