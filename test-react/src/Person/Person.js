import React from "react";
import styled from "styled-components";
// import "./Person.css";

const person = props => {
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
  // const style = {
  //   "@media (min-width: 500px)": {
  //     width: "450px"
  //   }
  // };
  return (
    // <div className="Person" style={style}>
    <StyledDiv>
      <p onClick={props.click}>
        I'm {props.name}. My age is {props.age} years old.
      </p>
      <input type="text" onChange={props.changed} value={props.name} />
      <p>{props.children}</p>
    </StyledDiv>
    // </div>
  );
};

export default person;
