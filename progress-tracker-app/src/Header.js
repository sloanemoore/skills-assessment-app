import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "./Header.css";

export default function Header(props) {
  const { handleAddSectionButtonClick } = props;

  return (
    <>
      <Card className="sectionbox-container">
        <Card.Header className="sectionbox-header">
          <a href="https://nowcodethis.com/" target="_blank">
            <Image
              className="logo"
              src="https://nowcodethis.com/wp-content/uploads/2020/07/cropped-now_code_this_icon.png"
              fluid
            />
            <span className="companyName">Now Code This</span>
          </a>
        </Card.Header>
        <Card.Body>
          <p className="sectionbox-header">Skills Progress Tracker</p>
          <p>
            It’s a well known fact that the road to becoming a software engineer
            is exciting, but not necessarily easy. As the saying goes, this is a
            marathon, not a sprint. Even once you’ve got a job as a software
            engineer, there’s plenty of learning and growing to do.
          </p>
          <p>
            You're going to be learning new things every day, and sometimes it
            will be helpful to look back and reflect on all you've accomplished.
            This tracker is designed to help you do just that! This is a place
            where you can privately (or publicly!) celebrate your
            accomplishments. And don't get discouraged if your progress seems
            slower than you'd like—some skills may take more time to master than
            others. But as long as you don’t give up, you'll eventually get to
            where you want to go.
          </p>
          <p>Enjoy the journey—this is going to be fun!</p>
          <Button
            className="add-section-button"
            onClick={handleAddSectionButtonClick}
          >
            Add a section
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
