// npm i --save react-slick@0.28.1
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "./Specialty.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg";
import specialtyImg2 from "../../../assets/specialty/chuyen-khoa-2.jpg";
import specialtyImg3 from "../../../assets/specialty/chuyen-khoa-3.jpg";
import specialtyImg4 from "../../../assets/specialty/chuyen-khoa-4.jpg";
import specialtyImg5 from "../../../assets/specialty/chuyen-khoa-5.jpg";
import specialtyImg6 from "../../../assets/specialty/chuyen-khoa-6.jpg";
class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <>
        <div className="section-specialty">
          <div className="specialty-container">
            <div className="specialty-header">
              <span className="title-section">Chuyên khoa phổ biến</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="specialty-body">
              <Slider {...settings}>
                <div className="specialty-customize">
                  <div className="bg-img"></div>
                  <div>Chuyên khoa 1</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-img"></div>

                  <div>Chuyên khoa 2</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-img"></div>

                  <div>Chuyên khoa 3</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-img"></div>

                  <div>Chuyên khoa 4</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-img"></div>

                  <div>Chuyên khoa 5</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-img"></div>

                  <div>Chuyên khoa 6</div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </>
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
