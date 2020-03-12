import React, { Component } from "react";
import styled from "styled-components";
import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass";
import PropTypes from "prop-types";
import AuthContext from "../../../context/auth-context";

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
        <AuthContext.Consumer>
          {context =>
            context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>
          }
        </AuthContext.Consumer>
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

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person);
