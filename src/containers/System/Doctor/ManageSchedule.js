import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
    //   this.setState({
    //     listDoctors: dataSelect,
    //   });
    // }
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.fullName}`;
        let labelEn = `${item.fullName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
        return result;
      });
    }
    return result;
  };

  render() {
    return (
      <div className="manage-schedule-container">
        <div className="m-schedule-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label className="col-6">Chọn bác sĩ</label>
              <Select
                options={this.state.listDoctors}
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
              />
            </div>
            <div className="col-6 form-group">
              <label className="col-6">Chọn ngày</label>
              <input className="form-control" />
            </div>
            <div className="col-12 pick-hour-container"></div>
            <button className="btn btn-primary"> Lưu thông tin</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
