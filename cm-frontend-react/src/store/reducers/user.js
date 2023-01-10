import * as types from "../action-types";
import { getToken } from "@/utils/auth";
const initUserInfo = {
  username: "",
  role: "",
  avatar:"",
  token: getToken(),
};
export default function user(state = initUserInfo, action) {
  switch (action.type) {
    case types.USER_SET_USER_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case types.USER_SET_USER_INFO:
      return {
        ...state,
        username: action.username,
        role: action.role,
        avatar: action.avatar,
      };
    case types.USER_RESET_USER:
      return {};
    default:
      return state;
  }
}
