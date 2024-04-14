import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import "./UserManage.scss";
import { connect } from "react-redux";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
  }
  /***
   * Run component
   * 1. Run construct -> init state
   * 2. Dis mount (set state)
   * 3. Render
   */

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        userData: response.users,
      });
    }
  }

  render() {
    console.log("check render", this.state.userData);
    let userData = this.state.userData;
    return (
      <div className="users-container">
        <div className="title text-center">Manage users</div>
        <div className="users-table mt-3 mx-1">
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
              {userData &&
                userData.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.email}</td>
                        <td>{item.fullName}</td>
                        <td>{item.address}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
