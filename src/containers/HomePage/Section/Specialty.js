// npm i --save react-slick@0.28.1
import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="section-img specialty-img"></div>
                <div>Chuyên khoa 1</div>
              </div>
              <div className="section-customize">
                <div className="section-img specialty-img"></div>
                <div>Chuyên khoa 2</div>
              </div>
              <div className="section-customize">
                <div className="section-img specialty-img"></div>
                <div>Chuyên khoa 3</div>
              </div>
              <div className="section-customize">
                <div className="section-img specialty-img"></div>
                <div>Chuyên khoa 4</div>
              </div>
              <div className="section-customize">
                <div className="section-img specialty-img"></div>
                <div>Chuyên khoa 5</div>
              </div>
              <div className="section-customize">
                <div className="section-img specialty-img"></div>
                <div>Chuyên khoa 6</div>
              </div>
            </Slider>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
