import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils/constant";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props); //kế thừa các props
    this.state = {
        isShowDetailInfor:false
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
    
  }
 
  render() {
  let {isShowDetailInfor}=this.state;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
            <div className="text-address">Địa chỉ khám:</div>
            <div className="name-clinic">Phòng khám chuyên khoa Da liễu</div>
            <div className="address-clinic">207 Phố huế - Hai Bà Trưng - Hà Nội</div>
        </div>
        <div className="content-down">
            {
                isShowDetailInfor=== false && 
            <div className="short-price">GIÁ KHÁM : 250.000đ 
                <span onClick={()=>this.showHideDetailInfor(true)}>Xem chi tiết</span>
            </div>
            }
            {
                isShowDetailInfor === true &&
                <>
                    <div className="title-price">GIÁ KHÁM:</div>
                    <div className="body-price">
                        <div className="top-price">
                            <span className="left">Giá khám</span>
                            <span className="right">250.000đ</span>
                        </div>
                        <div className="content-price">
                        Được ưu tiên khám trước khi đặt khám qua BookingCare. Giá khám cho người nước ngoài 30 USD 
                        </div>
                    </div>
                    <div className="footer-price">Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
                    <div className="hide-price">
                        <span onClick={()=>this.showHideDetailInfor(false)}>Ẩn bảng giá</span>
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
