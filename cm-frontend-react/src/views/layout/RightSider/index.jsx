import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import UserInfo from "./UserInfo";
import Todo from "./Todo";
const { Sider } = Layout;

const preTask = [["running 3km"], ["swimming 2km"], ["karaoke"]];

const LayoutSider = (props) => {
  const { sidebarCollapsed, sidebarLogo } = props;

  return (
    <Sider
      collapsible
      collapsed={sidebarCollapsed}
      trigger={null}
      style={{ zIndex: "10",backgroundColor:"#fff" }}
    >
      {sidebarLogo ? <UserInfo /> : null}
      <Todo preTask={preTask}/>
    </Sider>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.settings,
  };
};
export default connect(mapStateToProps)(LayoutSider);
