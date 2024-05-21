import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorSchedule.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import moment from "moment";
import localization from 'moment/locale/vi';
import {getScheduleDoctorByDate} from '../../../services/userService'

class DoctorSchedule extends Component {
  constructor(props) {
    super(props); //kế thừa các props
    this.state = {
      allDays:[],
      allAvailableTime:[]
    };
  }
  async componentDidMount() {
    let {language}=this.props;
    // console.log(moment(new Date()).format('dddd - DD/MM'));
    // console.log(moment(new Date()).locale('en').format('dddd - DD/MM'));
    this.setArrDays(language);
    
  }
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }
  setArrDays= (language)=>{
    let allDays=[]
    for(let i=0; i<7;i++){
      let object={};
      if(language === LANGUAGES.VI){
        let labelVi=moment(new Date()).add(i,'days').format('dddd - DD/MM');
        object.label= this.capitalizeFirstLetter(labelVi);
      }else{
        object.label=moment(new Date()).add(i,'days').locale('en').format('dddd - DD/MM');
      }
      object.value=moment(new Date()).add(i,'days').startOf('day').valueOf();
      allDays.push(object);
    }
    this.setState({
      allDays:allDays
    })
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.language !== prevProps.language){
      this.setArrDays(this.props.language);
    }
  }
  handleOnChangeSelect= async(event)=>{
    if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !==-1){
      let doctorId= this.props.doctorIdFromParent;
      let date=event.target.value;
      let res = await getScheduleDoctorByDate(doctorId,date);
      if(res && res.errCode === 0){
        this.setState({
        allAvailableTime: res.data ? res.data:[]
        })
      }
    console.log('check res schedule doctor by date:',res);

    }
    console.log('event onchange date value: ',event.target.value);
  }
  render() {
    let {allDays,allAvailableTime}=this.state;
    let {language}=this.props
   
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
        <select onChange={(event)=>this.handleOnChangeSelect(event)}>
          { allDays && allDays.length >0 && allDays.map((item,index) =>{
            return (
              <option key={index} value={item.value}>{item.label}</option>
            )
          })}
        </select>
        </div>
        <div className="all-available-time">
          <div className="text-calendar">
          <i className="fas fa-calendar-alt"><span>Lịch khám</span></i>
          </div>
          <div className="time-content">
            {
               allAvailableTime && allAvailableTime.length>0 ? allAvailableTime.map((item,index)=>{
                let timeDisplay=language === LANGUAGES.VI?item.timeTypeData.valueVi:item.timeTypeData.valueEn 
                return (

                  <button key={index}>{timeDisplay}</button>
                )
               }):
               <div> Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
