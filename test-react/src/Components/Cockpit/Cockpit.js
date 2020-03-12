import React from "react";
import styled from "styled-components";
import "./Cockpit.css";

const StyledButton = styled.button`
  background-color: ${props => (props.alt ? "red" : "green")};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;

  &:hover {
    background-color: ${props => (props.alt ? "salmon" : "lightgreen")};
    color: black;
  }
`;

const cockpit = props => {
  console.log("cockpit");
  const classes = [];
  if (props.persons.length <= 2) classes.push("red");
  if (props.persons.length <= 1) classes.push("bold");
  return (
    <div>
      <h1 className="App-intro">Hi, I'm a React App!</h1>
      <p className={classes.join(" ")}>This is really working!</p>
      <StyledButton alt={props.showPersons ? 1 : 0} onClick={props.clicked}>
        Click Me!
      </StyledButton>
    </div>
  );
};

export default cockpit;
