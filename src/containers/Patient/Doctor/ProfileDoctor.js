import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import {getProfileInforDoctorById} from '../../../services/userService';
import { LANGUAGES } from "../../../utils/constant";
import { FormattedMessage } from "react-intl";
import { NumericFormat } from "react-number-format";


class ProfileDoctor extends Component {
  constructor(props) {
    super(props); //kế thừa các props
    this.state = {
        dataProfile:{}
    };
  }
  async componentDidMount() {
    
    let { language } = this.props;
    let  data = await this.getProfileDoctor(this.props.doctorId);
    this.setState({
        dataProfile:data
    });
    
  }
  getProfileDoctor = async (id)=>{
    let result={};

    if(id){
        let res= await getProfileInforDoctorById(id);
        if(res && res.errCode ===0){
            result=res.data;
        }
    }
     return result;
  }
  
   async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.language !== prevProps.language){
        // this.getProfileDoctor(this.props.doctorId);
    }
    if(this.props.doctorId !== prevProps.doctorId){
        // this.getProfileDoctor(this.props.doctorId);
    }
  }
 
  render() {
    let {dataProfile}=this.state;
    console.log(dataProfile);
    let {language}=this.props;
    let nameVi='',nameEn='';
    if(dataProfile && dataProfile.positionData){
        nameVi=`${dataProfile.positionData.valueVi},${dataProfile.fullName}`;
        nameEn=`${dataProfile.positionData.valueEn},${dataProfile.fullName}`;
    }
    return (
        <div className="profile-doctor-container">
            <div className="intro-doctor">
                    <div
                    className="content-left"
                    style={{
                        backgroundImage: `url(${
                        dataProfile && dataProfile.image ? dataProfile.image : ""
                        })`,
                    }}
                    ></div>
                    <div className="content-right">
                    <div className="content-right__up">
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                    </div>
                    <div className="content-right__down">
                       
                    </div>
                    </div>
            </div>
            <div className="price">
            Giá Khám :
                        { dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceIdData &&  language === LANGUAGES.VI 
                          && dataProfile.Doctor_Infor.priceIdData.valueVi
                          ? <NumericFormat
                              className="currency" 
                              value={dataProfile.Doctor_Infor.priceIdData.valueVi} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'VNĐ'}
                          />
                          :""  
                        } 
                        { dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceIdData &&  language === LANGUAGES.EN 
                          && dataProfile.Doctor_Infor.priceIdData.valueEn
                          ? <NumericFormat
                              className="currency" 
                              value={dataProfile.Doctor_Infor.priceIdData.valueEn} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={'$'}
                          />
                          :""  
                        } 
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
