import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về Cơ sở Y tế
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/-t9_cHxVpWo"
              title="Nhạc Chill TikTok - Mây Lofi, Ngày Em Đẹp Nhất | Những Bản Lofi Chill Tâm Trạng Nhẹ Nhàng"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Tuyến cao tốc dài 99 km nối hai tỉnh Đồng Nai - Bình Thuận nguy cơ
              không có đơn vị bảo trì, cứu hộ từ ngày 28/4 tới do công ty quản
              lý không còn nguồn lực duy trì. Tại buổi làm việc với Công ty cổ
              phần Dịch vụ Kỹ thuật đường cao tốc Việt Nam (VEC E) hôm 19/4, Ban
              Quản lý dự án Thăng Long (chủ đầu tư, thuộc Bộ Giao thông Vận
              tải), cho biết đã có văn bản báo cáo cơ quan có thẩm quyền về
              nguồn kinh phí chi trả cho đơn vị này, song chưa nhận được trả lời
              nên không đủ cơ sở thanh toán. Hai bên thống nhất Ban quản lý dự
              án Thăng Long tiếp tục báo cáo Bộ Giao thông Vận tải về nguồn kinh
              phí trả cho VEC E. Nếu đến ngày 28/4, khoản kinh phí này vẫn chưa
              xác định được, VEC E sẽ tạm dừng quản lý, vận hành, bảo trì cao
              tốc Dầu Giây - Phan Thiết.
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
