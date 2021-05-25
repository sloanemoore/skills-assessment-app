import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./SkillBox.css";
import Circle from "./Circle.js";

export default function SkillBox(props) {
  const {
    section,
    handleDeleteSkillButtonClick,
    progressList,
    setProgressList,
  } = props;

  const deleteIcon = <FontAwesomeIcon icon={faTimes} />;

  const numLevels = 5;

  const circleArray = [...Array(numLevels).keys()];

  function handleSkillNameChange(event, skill) {
    const newSkillName = event.target.value;
    const skillKey = skill.key;
    const newSkill = {
      key: skill.key,
      skillName: newSkillName,
      skillLevel: skill.skillLevel,
    };
    const tempSectionSkills = section.skills.map((skill) => {
      if (skill.key === skillKey) return newSkill;
      return skill;
    });
    const sectionKey = section.key;
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
  }

  return (
    <>
      {section.skills.map((skill) => {
        return (
          <Card key={skill.key} className="skillbox-container mx-1 col-lg-5">
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col className="col-9">
                    <InputGroup className="mb-3 skillbox-name">
                      <FormControl
                        placeholder="Enter a skill"
                        onChange={(event) =>
                          handleSkillNameChange(event, skill)
                        }
                        value={skill.skillName}
                      />
                    </InputGroup>
                  </Col>
                  <Col className="text-right col-3">
                    <Button
                      variant="link"
                      className="skillbox-delete-icon"
                      onClick={() =>
                        handleDeleteSkillButtonClick(section, skill)
                      }
                    >
                      {deleteIcon}
                    </Button>
                  </Col>
                </Row>
              </Card.Title>
              <Row>
                <Col>
                  <Circle
                    skill={skill}
                    section={section}
                    progressList={progressList}
                    setProgressList={setProgressList}
                    circleArray={circleArray}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}
