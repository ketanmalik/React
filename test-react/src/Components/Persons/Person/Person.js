import React, { Component } from "react";
import styled from "styled-components";
import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass";

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
class Person extends Component {
  render() {
    return (
      <Aux>
        <p onClick={this.props.clicked}>
          I'm {this.props.name}. My age is {this.props.age} years old.
        </p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
        <p>{this.props.children}</p>
      </Aux>
    );
  }
}

export default withClass(Person);
