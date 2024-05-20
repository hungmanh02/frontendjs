import axios from "../axios";
const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", {
    email: userEmail,
    password: userPassword,
  });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  // console.log("check from data service:", data);
  return axios.post("/api/create-new-user", data);
};
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctorService = () => {
  return axios.get("/api/get-all-doctor");
};
const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctor", data);
};
const getDetailInforDoctor = (doctorId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule",data);
};
const getScheduleDoctorByDate = (doctorId,date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?id=${doctorId}&date=${date}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  editUserService,
  deleteUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorService,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate
};
