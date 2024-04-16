import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import _ from "lodash";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import { emitter } from "../../utils/emitter";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      fullName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser; //{}
    // let {user}= this.props;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashcode",
        fullName: user.fullName,
        address: user.address,
      });
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangeInput = (event, id) => {
    // good code
    /**
     * copy state
     * modifine lại state qua copy state
     * setSate lại từ copyState
     * use call back function console.log ra không bị bất đồng bộ
     */
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };
  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "fullName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameter ${arrInput[i]} !`);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    // validate
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit a user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                className=""
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                className=""
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
                value={this.state.password}
                disabled
              />
            </div>
            <div className="input-container">
              <label>Full Name</label>
              <input
                type="text"
                className=""
                onChange={(event) => {
                  this.handleOnChangeInput(event, "fullName");
                }}
                value={this.state.fullName}
              />
            </div>
            <div className="input-container">
              <label>Address</label>
              <input
                type="text"
                className=""
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save changes
          </Button>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
