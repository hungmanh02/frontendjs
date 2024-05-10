import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";

class DetailDoctor extends Component {
  render() {
    console.log("check prop id detail doctor", this.props.match.params.id);
    return <HomeHeader isShowBanner={false} />;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
