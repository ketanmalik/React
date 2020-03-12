import React, { useEffect, memo, useRef, useContext } from "react";
import AuthContext from "../../context/auth-context";
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
  const authContext = useContext(AuthContext);
  const toggleBtnRef = useRef(null);
  useEffect(() => {
    console.log("Cockpit persons changed");
    toggleBtnRef.current.click();
  }, [props.persons]);
  const classes = [];
  if (props.persons <= 2) classes.push("red");
  if (props.persons <= 1) classes.push("bold");
  return (
    <div>
      <h1 className="App-intro">Hi, I'm a React App!</h1>
      <p className={classes.join(" ")}>This is really working!</p>
      <StyledButton
        alt={props.showPersons ? 1 : 0}
        onClick={props.clicked}
        ref={toggleBtnRef}
      >
        Click Me!
      </StyledButton>
      <StyledButton onClick={authContext.login}>Log in</StyledButton>
    </div>
  );
};

export default React.memo(cockpit);
