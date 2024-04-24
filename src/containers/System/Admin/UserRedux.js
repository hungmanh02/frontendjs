import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./UserRedux.scss";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      preViewImgURL: "",
      isOpen: false,
    };
  }

  async componentDidMount() {
    // Redux
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    //React
    // try {
    //   let getGender = await getAllCodeService("gender");
    //   let getRole = await getAllCodeService("role");
    //   let getPosition = await getAllCodeService("position");
    //   if (getGender && getGender.errCode === 0) {
    //     this.setState({
    //       genderArr: getGender.data,
    //     });
    //   }
    //   if (getRole && getRole.errCode === 0) {
    //     this.setState({
    //       roleArr: getRole.data,
    //     });
    //   }
    //   if (getPosition && getPosition.errCode === 0) {
    //     this.setState({
    //       positionArr: getPosition.data,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
  componentDidUpdate(prevProps, prevState, snapshort) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      console.log("check genderRedux", this.props.genderRedux);
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      console.log("check position Redux", this.props.positionRedux);
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      console.log("check role Redux", this.props.roleRedux);
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }
  }
  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        preViewImgURL: objectUrl,
      });
    }
  };
  openPreViewImage = () => {
    if (!this.state.preViewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    // let isGetGender = this.props.isLoadingGender;
    return (
      <div className="user-redux-container">
        <div className="title">Learn React - Redux </div>
        {/* <div> {isGetGender === true ? "loading gender" : ""}</div> */}
        <div className="user-redux-body">
          <div className="container">
            <div className="">
              <h4>Thêm mới người dùng</h4>
            </div>
            <form>
              <div className="form-row my-3">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputFullName4">
                    <FormattedMessage id="manage-user.full-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFullName4"
                    placeholder="Họ và Tên"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPhoneNumber">
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPhoneNumber"
                    placeholder="
                     
                    Số điện thoại
                    "
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Nhập địa chỉ nhà ...."
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="inputGender">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select id="inputGender" className="form-control">
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputPosition">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select id="inputPosition" className="form-control">
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputRole">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select id="inputRole" className="form-control">
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputImage">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    type="file"
                    className="form-control"
                    id="previewImage"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label htmlFor="previewImage" className="label-upload">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.preViewImgURL})`,
                    }}
                    onClick={() => this.openPreViewImage()}
                  ></div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary px-4 mt-3">
                Sign in
              </button>
            </form>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.preViewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
