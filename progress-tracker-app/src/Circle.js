import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import Confetti from "react-dom-confetti";
import "./Circle.css";

export default function Circle(props) {
  const { skill, section, progressList, setProgressList, circleArray } = props;

  const [filledArray, setFilledArray] = useState(
    circleArray.map((element) => false)
  );

  const [skillLevelIncreased, setSkillLevelIncreased] = useState(false);

  useEffect(() => {
    if (skillLevelIncreased) {
      setSkillLevelIncreased(false);
    }
  }, [skillLevelIncreased]);

  const solidCircleIcon = <FontAwesomeIcon icon={faCircle} />;

  const regCircleIcon = <FontAwesomeIcon icon={faCircleRegular} />;

  function handleButtonClick(circleIndex, currentSkillLevel) {
    const skillKey = skill.key;
    const sectionKey = section.key;
    let tempFilledArray;
    if (!filledArray[circleIndex]) {
      // update skill.skillLevel to circleIndex
      const tempSkill = {
        key: skill.key,
        skillName: skill.skillName,
        skillLevel: circleIndex,
      };
      const tempSkills = section.skills.map((skill) => {
        if (skill.key === skillKey) return tempSkill;
        return skill;
      });
      const tempSection = {
        key: section.key,
        sectionName: section.sectionName,
        skills: tempSkills,
      };
      const tempProgressList = progressList.map((section) => {
        if (section.key === sectionKey) return tempSection;
        return section;
      });
      setProgressList(tempProgressList);
      // update filledArray
      tempFilledArray = filledArray.map((value, index) => {
        if (circleIndex === index) return !value;
        return false;
      });
      setFilledArray(tempFilledArray);
      if (circleIndex > currentSkillLevel) {
        setSkillLevelIncreased(true);
      }
    } else {
      // set skill.skillLevel to -1
      const tempSkill = {
        key: skill.key,
        skillName: skill.skillName,
        skillLevel: -1,
      };
      const tempSkills = section.skills.map((skill) => {
        if (skill.key === skillKey) return tempSkill;
        return skill;
      });
      const tempSection = {
        key: section.key,
        sectionName: section.sectionName,
        skills: tempSkills,
      };
      const tempProgressList = progressList.map((section) => {
        if (section.key === sectionKey) return tempSection;
        return section;
      });
      setProgressList(tempProgressList);
      // set all elements of filledArray to false
      setFilledArray(circleArray.map((element) => false));
    }
  }

  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: "100",
    dragFriction: 0.12,
    duration: "3680",
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <>
      <Confetti active={skillLevelIncreased} config={config} />
      {circleArray.map((circleIndex) => {
        let element;
        const currentSkillLevel = skill.skillLevel;
        if (circleIndex <= currentSkillLevel) {
          element = (
            <span
              key={circleIndex}
              className="circle"
              onClick={() => handleButtonClick(circleIndex, currentSkillLevel)}
            >
              {solidCircleIcon}
            </span>
          );
        } else {
          element = (
            <span
              key={circleIndex}
              className="circle"
              onClick={() => handleButtonClick(circleIndex, currentSkillLevel)}
            >
              {regCircleIcon}
            </span>
          );
        }
        return element;
      })}
    </>
  );
}
