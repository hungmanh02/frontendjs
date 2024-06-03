import React, { Component } from "react";
import { connect } from "react-redux";
import "./DefaultClass.scss";
import { LANGUAGES } from "../../../utils/constant";
import { FormattedMessage } from "react-intl";

class DefaultClass extends Component {
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
      <div> </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
