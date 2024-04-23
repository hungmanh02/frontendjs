import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCSSES:
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
      };
    // return {
    //   ...state,
    //   isLoggedIn: true,
    //   adminInfo: action.adminInfo,
    // };
    default:
      return state;
  }
};

export default adminReducer;
