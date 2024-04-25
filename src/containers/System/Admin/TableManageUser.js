import React, { Component } from "react";
import "./TableManageUser.scss";
import { connect } from "react-redux";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  /***
   * Run component
   * 1. Run construct -> init state
   * 2. Dis mount (set state)
   * 3. Render (re-render)
   */

  componentDidMount() {}

  render() {
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
          <tr>
            <td>{"item.email"}</td>
            <td>{"item.fullName"}</td>
            <td>{"item.address"}</td>
            <td>
              <button className="btn-edit">
                <i className=" fas fa-pencil-alt"></i>
              </button>

              <button className="btn-delete">
                <i className=" fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
