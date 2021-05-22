import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SkillBox from "./SkillBox.js";
import "./SectionBox.css";

export default function SectionBox(props) {
  const {
    progressList,
    setProgressList,
    handleAddSkillButtonClick,
    handleDeleteSectionButtonClick,
    handleDeleteSkillButtonClick,
  } = props;
  const deleteIcon = <FontAwesomeIcon icon={faTimes} />;

  function handleSectionNameChange(event, section) {
    const newSectionName = event.target.value;
    const sectionKey = section.key;
    const tempSection = {
      key: section.key,
      sectionName: newSectionName,
      skills: section.skills,
    };
    const tempProgressList = progressList.map((section) => {
      if (section.key === sectionKey) return tempSection;
      return section;
    });
    setProgressList(tempProgressList);
  }

  return (
    <>
      {progressList.map((section) => {
        return (
          <Card key={section.key} className="sectionbox-container">
            <Card.Header>
              <Row>
                <Col>
                  <InputGroup className="mb-3 sectionbox-name">
                    <FormControl
                      className="sectionbox-header"
                      placeholder="Enter section name"
                      onChange={(event) =>
                        handleSectionNameChange(event, section)
                      }
                      value={section.sectionName}
                    />
                  </InputGroup>
                </Col>
                <Col className="text-right">
                  <Button
                    variant="link"
                    className="sectionbox-delete-icon"
                    onClick={() => handleDeleteSectionButtonClick(section)}
                  >
                    {deleteIcon}
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <SkillBox
                section={section}
                handleDeleteSkillButtonClick={handleDeleteSkillButtonClick}
                progressList={progressList}
                setProgressList={setProgressList}
              />
              <Button
                className="add-skill-button"
                onClick={() => handleAddSkillButtonClick(section)}
              >
                Add a skill
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}
