import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-redux-container">
        <div className="title">Learn React - Redux </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="">
              <h4>Thêm mới người dùng</h4>
            </div>
            <form>
              <div class="form-row my-3">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">
                    {" "}
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputFullName4">
                    <FormattedMessage id="manage-user.full-name" />
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputFullName4"
                    placeholder="Họ và Tên"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPhoneNumber">
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputPhoneNumber"
                    placeholder="
                     
                    Số điện thoại
                    "
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputAddress">
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="Nhập địa chỉ nhà ...."
                />
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputGender">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select id="inputGender" class="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="form-group col-md-4">
                  <label for="inputPosition">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select id="inputPosition" class="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="form-group col-md-4">
                  <label for="inputRole">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select id="inputRole" class="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="inputImage">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <input type="file" class="form-control" id="inputImage" />
              </div>
              <button type="submit" class="btn btn-primary px-4 mt-3">
                Sign in
              </button>
            </form>
          </div>
        </div>
        ;
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
