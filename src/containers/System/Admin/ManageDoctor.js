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

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHtml: "",
      selectedOption: "",
      description: "",
      allDoctor: "",
      hasOldData: false,
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
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({
        allDoctor: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({
        allDoctor: dataSelect,
      });
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
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
    });
    console.log("check text markdown :", this.state);
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInforDoctor(selectedOption.value);
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
    console.log("check option selected ", res);
  };
  handleOnchangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
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
    return result;
  };

  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
        <div className="manage-doctor-infor">
          <div className="content-left form-group">
            <label>Chọn bác sĩ</label>
            <Select
              options={this.state.allDoctor}
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
            />
          </div>
          <div className="content-right form-group">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnchangeDescription(event)}
              value={this.state.description}
            ></textarea>
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
            <span>Lưu thông tin</span>
          ) : (
            <span>Tạo thông tin</span>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
