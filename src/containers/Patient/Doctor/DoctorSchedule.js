import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorSchedule.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import moment from "moment";
import localization from 'moment/locale/vi'

class DoctorSchedule extends Component {
  constructor(props) {
    super(props); //kế thừa các props
    this.state = {
      allDays:[],
    };
  }
  async componentDidMount() {
    let {language}=this.props;
    // console.log(moment(new Date()).format('dddd - DD/MM'));
    // console.log(moment(new Date()).locale('en').format('dddd - DD/MM'));
    this.setArrDays(language);
    
  }
  setArrDays=(language)=>{
    let allDays=[]
    for(let i=0; i<7;i++){
      let object={};
      if(language === LANGUAGES.VI){
        object.label=moment(new Date()).add(i,'days').format('dddd - DD/MM');
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
  render() {
    let {allDays}=this.state;
   
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
        <select>
          { allDays && allDays.length >0 && allDays.map((item,index) =>{
            return (
              <option key={index} value={item.value}>{item.label}</option>
            )
          })}
        </select>
        </div>
        <div className="all-available-time"></div>
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
