import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils/constant";
import { FormattedMessage } from "react-intl";
import { NumericFormat } from "react-number-format";
import { getExtraInforDoctorById } from "../../../services/userService";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props); //kế thừa các props
    this.state = {
        isShowDetailInfor:false,
        extraInfor:{}
    };
  }
showHideDetailInfor=(status)=>{
this.setState({
    isShowDetailInfor:status
})
}
  async componentDidMount() {
    let {language}=this.props;
    // console.log(moment(new Date()).format('dddd - DD/MM'));
    // console.log(moment(new Date()).locale('en').format('dddd - DD/MM'));
    

  }
  
   async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.language !== prevProps.language){
     let res= await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if(res && res.errCode === 0){
        this.setState({
          extraInfor:res.data
        })
      }
    }
    if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
      let res= await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if(res && res.errCode === 0){
        this.setState({
          extraInfor:res.data
        })
      }
    }
  }
 
  render() {
  let {isShowDetailInfor,extraInfor}=this.state;
  let {language}=this.props;
  // console.log("check state:",extraInfor)
  // console.log('check state ui:',this.state);
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
            <div className="text-address"><FormattedMessage id="patient.extra-infor-doctor.text-address" /></div>
            <div className="name-clinic">{extraInfor && extraInfor.nameClinic ?extraInfor.nameClinic:""}</div>
            <div className="address-clinic">{extraInfor && extraInfor.addressClinic ?extraInfor.addressClinic:""}</div>
        </div>
        <div className="content-down">
            {
              isShowDetailInfor=== false && 
              <div className="short-price"><FormattedMessage id="patient.extra-infor-doctor.price"/>: 
              { extraInfor && extraInfor.priceIdData && language ===LANGUAGES.VI 
                && extraInfor.priceIdData.valueVi
                ? <NumericFormat
                    className="currency" 
                    value={extraInfor.priceIdData.valueVi} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    suffix={'VNĐ'}
                />
                :""  
              } 
              { extraInfor && extraInfor.priceIdData && language ===LANGUAGES.EN 
                && extraInfor.priceIdData.valueVi
                ? <NumericFormat
                    className="currency" 
                    value={extraInfor.priceIdData.valueEn} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    suffix={'$'}
                />
                :""  
              }
                <span className="detail-price" onClick={()=>this.showHideDetailInfor(true)}><FormattedMessage id="patient.extra-infor-doctor.detail-price"/></span>
            </div>
            }
            {
                isShowDetailInfor === true &&
                <>
                    <div className="title-price"><FormattedMessage id="patient.extra-infor-doctor.price"/>:</div>
                    <div className="body-price">
                        <div className="top-price">
                            <span className="left"><FormattedMessage id="patient.extra-infor-doctor.price"/></span>
                            <span className="right">
                              { extraInfor && extraInfor.priceIdData && language ===LANGUAGES.VI 
                                  && extraInfor.priceIdData.valueVi
                                  ? <NumericFormat
                                      className="currency" 
                                      value={extraInfor.priceIdData.valueVi} 
                                      displayType={'text'} 
                                      thousandSeparator={true} 
                                      suffix={'VNĐ'}
                                  />
                                  :""  
                                } 
                                { extraInfor && extraInfor.priceIdData && language ===LANGUAGES.EN 
                                  && extraInfor.priceIdData.valueVi
                                  ? <NumericFormat
                                      className="currency" 
                                      value={extraInfor.priceIdData.valueEn} 
                                      displayType={'text'} 
                                      thousandSeparator={true} 
                                      suffix={'$'}
                                  />
                                  :""  
                                }
                            </span>
                        </div>
                        <div className="content-price"> {extraInfor && extraInfor.note  ?extraInfor.note:""}</div>
                    </div>
                    <div className="payment-price"><FormattedMessage id="patient.extra-infor-doctor.payment-price"/>{extraInfor && extraInfor.paymentIdData && language === LANGUAGES.VI 
                    ?extraInfor.paymentIdData.valueVi
                    : extraInfor && extraInfor.paymentIdData && language === LANGUAGES.EN ? extraInfor.paymentIdData.valueEn:''}</div>
                    <div className="hide-price">
                        <span onClick={()=>this.showHideDetailInfor(false)}><FormattedMessage id="patient.extra-infor-doctor.hide-price"/></span>
                    </div>
                </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
