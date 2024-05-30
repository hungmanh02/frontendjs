import React, { Component } from "react";
import "./ManageDoctor.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it/index";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTION, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {

      // save to Markdown table
      contentMarkdown: "",
      contentHtml: "",
      description: "",
      allDoctor: [],
      selectedDoctor: "",
      hasOldData: false,

      // save to doctor infor table
      allPrice: [],
      allPayment: [],
      allProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      count: "",
    };
  }
  handleEditUser = (user) => {
    this.props.handleEditUserFromparentKey(user);
  };
  handleDeleteUser = (user) => {
    console.log("delete user", user);
    this.props.deleteUserRedux(user.id);
  };

  /***
   * Run component
   * 1. Run construct -> init state
   * 2. Dis mount (set state)
   * 3. Render (re-render)
   */

  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.getAllRequiredDoctorInfor();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS');
      this.setState({
        allDoctor: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor,"USERS");
      let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE');
      let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT');
      let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE');
      this.setState({
        allDoctor: dataSelect,
        allPrice: dataSelectPrice,
        allPayment: dataSelectPayment,
        allProvince: dataSelectProvince
      });
    }
    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE');
      let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT');
      let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE');
      this.setState({
        allPrice: dataSelectPrice,
        allPayment: dataSelectPayment,
        allProvince: dataSelectProvince
      })

    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHtml: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHtml: this.state.contentHtml,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
      //
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
    console.log("check text markdown - doctor infor:", this.state);
    
  };
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await getDetailInforDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHtml: markdown.contentHtml,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHtml: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };
  handleChangeSelectDoctorInfor = async(selectedOption,name)=>{
    let stateName=name.name;
    let stateCopy= {...this.state};
    stateCopy[stateName]=selectedOption;
    this.setState({
      ...stateCopy
    })
  }

  handleOnchangeText = (event,id) => {
    let stateCopy= {...this.state};
    stateCopy[id]=event.target.value;
    this.setState({
      ...stateCopy
    });
    console.log(stateCopy);
  };
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if(type === 'USERS'){
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.fullName}`;
          let labelEn = `${item.fullName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
          return result;
        });
      }
      if(type === 'PRICE'){
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
          return result;
        });
      }
      if( type==='PAYMENT'){
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
          return result;
        });
      }
      if(type==='PROVINCE'){
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
          return result;
        });
      }
    }
    return result;
  };

  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"><FormattedMessage id="admin.manage-doctor.title" /></div>
        <div className="manage-doctor-infor">
          <div className="content-left form-group">
            <label><FormattedMessage id="admin.manage-doctor.select-doctor-title" /></label>
            <Select
              options={this.state.allDoctor}
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor-placeholder" />}

            />
          </div>
          <div className="content-right form-group">
            <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
            <textarea
              className="form-control"
              onChange={(event) => this.handleOnchangeText(event,'description')}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-extra row">
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.price"/></label>
            <Select
              options={this.state.allPrice}
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              name="selectedPrice"
              placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}

            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.payment"/></label>
            <Select
              options={this.state.allPayment}
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              name="selectedPayment"
              placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>}

            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.province"/></label>
            <Select
              options={this.state.allProvince}
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              name="selectedProvince"
              placeholder={<FormattedMessage id="admin.manage-doctor.province"/>}

            />
          </div>

          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.nameClinic"/></label>
            <input className="form-control"
            onChange={(event) => this.handleOnchangeText(event,'nameClinic')}
            value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.addressClinic"/></label>
            <input className="form-control" 
            onChange={(event) => this.handleOnchangeText(event,'addressClinic')}
            value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.note"/></label>
            <input className="form-control" 
            onChange={(event) => this.handleOnchangeText(event,'note')}
            value={this.state.note}
            />
          </div>

        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
        >
          {hasOldData === true ? (
            <span><FormattedMessage id="admin.manage-doctor.save" /></span>
          ) : (
            <span><FormattedMessage id="admin.manage-doctor.add" /></span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctor: state.admin.allDoctor,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getAllRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
