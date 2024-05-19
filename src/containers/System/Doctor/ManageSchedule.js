import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _, { result } from "lodash";
import {saveBulkScheduleDoctor} from '../../../services/userService'
import moment from "moment/moment";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
      isSelected: false,
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllScheduleTime();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isSelected: false,
        }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickBtnTime = (time) => {
    console.log("check item time btn:", time);
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
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
  handleSaveSchedule = async() => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formatedDate = new Date(currentDate).getTime();
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid select doctor !");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid date !");
      return;
    }
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      let result = [];
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let objectTime = {};
          objectTime.doctorId = selectedDoctor.value;
          objectTime.date = formatedDate;
          objectTime.timeType = schedule.keyMap;
          result.push(objectTime);
        });
      } else {
        toast.error("Invalid selected time!");
        return;
      }
      
      let res = await saveBulkScheduleDoctor({
        arrSchedule:result,
        doctorId:selectedDoctor.value,
        formatedDate:formatedDate
      });
      console.log('check res bulk create schedule:',res);
    }
  };
  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    return (
      <div className="manage-schedule-container">
        <div className="m-schedule-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label className="col-6">
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                options={this.state.listDoctors}
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
              />
            </div>
            <div className="col-6 form-group">
              <label className="col-6">
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={new Date()}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule active  px-3"
                          : "btn btn-schedule  px-3"
                      }
                      key={index}
                      onClick={() => this.handleClickBtnTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary btn-save-schedule px-3"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
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
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
