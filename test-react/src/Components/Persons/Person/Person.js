import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 60%;
  margin: 16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;

  @media (min-width: 500px) {
    width: 450px;
  }
`;
const person = props => {
  return (
    <StyledDiv>
      <p onClick={props.clicked}>
        I'm {props.name}. My age is {props.age} years old.
      </p>
      <input type="text" onChange={props.changed} value={props.name} />
      <p>{props.children}</p>
    </StyledDiv>
  );
};

export default person;
