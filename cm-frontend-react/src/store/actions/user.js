import * as types from "../action-types";
import { reqUserInfo } from "@/api/user";
import {setAccessToken} from "../../utils/auth";
import {message} from "antd";
import {Redirect} from "react-router-dom";
import React from "react";

export const getUserInfo = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqUserInfo({token: token})
      .then((response) => {
        const data  = response.data;

        // console.log(response)
        if (response.statusCode === 200) {
          // console.log(data)
          const userInfo = data;
          if(userInfo === null){
            message.error("Login expired or login in another browser.");
            dispatch(resetUser())
            return <Redirect to="/login" />;
          }
          setAccessToken(data.userAccessToken);
          dispatch(setUserInfo(userInfo));
          // debugger
          resolve(data);
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setUserToken = (token) => {
  return {
    type: types.USER_SET_USER_TOKEN,
    token,
  };
};

export const setUserAccessToken = (token) => {
  return {
    type: types.USER_SET_USER_ACCESS_TOKEN,
    token,
  };
};

export const setUserInfo = (userInfo) => {

  return {
    type: types.USER_SET_USER_INFO,
    ...userInfo,
    username: userInfo.username,
    role: 'admin',
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
  };
};

export const resetUser = () => {
  return {
    type: types.USER_RESET_USER,
  };
};
