import React from "react";
import "./index.less";
import { getUserInfo } from "../../../../store/actions/user";
import { connect } from "react-redux";

const UserInfo = (props) => {
  const {
    token,
    getUserInfo,
  } = props;

  let [userEmail, setUserEmail] = React.useState();
  let [userName, setUserName] = React.useState();
  let [userDate, setUserDate] = React.useState();


  token && getUserInfo(token);
  getUserInfo(token).then(res=>{
    var date = new Date(res.tokenDate).getDate();
    var month = new Date(res.tokenDate).getMonth();
    var year = new Date(res.tokenDate).getFullYear();
    var time = date + "/" + month + "/" + year
    console.log("test")
    setUserEmail(res.email)
    setUserName(res.fullname)
    setUserDate(time)
  })
  

  return (
    <div className="user-info">
      <div className="user-card">
        <div className="img-container"></div>
        <p className="user-name">{userName}</p>
        <p className="user-email">Email:{userEmail}</p>
        <p className="user-join-date">Join Date:{userDate}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings,
  };
};

export default connect(mapStateToProps, {getUserInfo })(UserInfo);

