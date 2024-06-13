import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
// import { LANGUAGES } from "../../../utils/constant";
import {Modal} from "reactstrap";
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";

class BookingModal extends Component {
  constructor(props) {
    super(props); //kế thừa các props
    this.state = {
    };
  }
  async componentDidMount() {
    let {language}=this.props;
    

  }
  
   async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.language !== prevProps.language){
     
    }
  }
 
  render() {
    let{isOpenModal,isCloseModal,dataTimeModal}=this.props;
    let doctorId='';
    if(dataTimeModal && !_.isEmpty(dataTimeModal)){
      doctorId=dataTimeModal.doctorId;
    }
    return (
        // toggle={toggle}
        <Modal
        isOpen={isOpenModal}
        size="lg"
        centered
        // backdrop={true}
        className={'booking-modal-container'}
        >
            <div className="booking-modal-content">
                <div className="booking-modal-header">
                    <span className="left">Thông tin đặt lịch khám bệnh</span>
                    <span className="right"
                    onClick={isCloseModal}
                    >
                      <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="booking-modal-body">
                  {/* {JSON.stringify(dataTimeModal)} */}
                  <div className="doctor-infor">
                    <ProfileDoctor
                      doctorId={doctorId}
                      isShowDescriptionDoctor={false}
                      dataTime={dataTimeModal}
                    
                    />
                  </div>
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>Họ tên</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="col-6 form-group">
                      <label>Số điện thoại</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="col-6 form-group">
                      <label>Địa chỉ Email</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="col-6 form-group">
                      <label>Địa chỉ liên hệ</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="col-12 form-group">
                      <label>Lý do khám</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="col-6 form-group">
                      <label>Đặt cho ai</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="col-6 form-group">
                      <label>Giới tính</label>
                      <input type="text" className="form-control"/>
                    </div>
                  </div>


                </div>
                <div className="booking-modal-footer">
                  <button className="btn-booking-confirm">Xác nhận</button>
                  <button className="btn-booking-cancel" onClick={isCloseModal}>Hủy</button>

                </div>
            </div>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
