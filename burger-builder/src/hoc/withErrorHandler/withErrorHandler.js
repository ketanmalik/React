import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";
import Aux from "../Aux";

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = { error: null };

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      console.log(this.props);
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            Something went wrong :(
          </Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
