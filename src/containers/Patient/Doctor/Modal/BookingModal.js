import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
// import { LANGUAGES } from "../../../utils/constant";
import {Modal} from "reactstrap";
import { FormattedMessage } from "react-intl";

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
    return (
        // toggle={toggle}
        <Modal
        isOpen={true}
        size="lg"
        centered
        // backdrop={true}
        className={'booking-modal-container'}
        >
            <div className="booking-modal-content">
                <div className="booking-modal-header">
                    <span className="left">Thông tin đặt lịch khám bệnh</span>
                    <span className="right"><i className="fas fa-times"></i></span>
                </div>
                <div className="booking-modal-body">
            Hello world inside modal

                </div>
                <div className="booking-modal-footer">

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
