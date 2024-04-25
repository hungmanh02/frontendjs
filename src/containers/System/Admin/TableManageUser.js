import React, { Component } from "react";
import "./TableManageUser.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  /***
   * Run component
   * 1. Run construct -> init state
   * 2. Dis mount (set state)
   * 3. Render (re-render)
   */

  componentDidMount() {
    this.props.fetchAllUserRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUserRedux !== this.props.listUserRedux) {
      this.setState({
        usersRedux: this.props.listUserRedux,
      });
    }
  }

  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <table id="customers">
        <thead>
          <tr>
            <th>Email</th>
            <th>Full name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {arrUsers &&
            arrUsers.length > 0 &&
            arrUsers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.fullName}</td>
                  <td>{item.address}</td>
                  <td>
                    <button className="btn-edit">
                      <i className=" fas fa-pencil-alt"></i>
                    </button>

                    <button className="btn-delete">
                      <i className=" fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUserRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
