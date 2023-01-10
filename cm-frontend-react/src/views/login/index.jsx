import React, { useState, Component } from "react";
import {Link, Redirect} from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

const Login = (props) => {
  const { form, token, login, getUserInfo } = props;
  // const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    // debugger
    login(username, password)
      .then((data) => {
        // console.log(data)
        message.success("Login success!");
        handleUserInfo(data.token);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  // 获取用户信息
  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => {})
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();
    // console.log(event)
    // const { username, password } = values;
    // handleLogin(username, password);
    // 对所有表单字段进行检验
    // form.validateFields((err, values) => {
    //   // 检验成功
    //   if (!err) {
    //     const { username, password } = values;
    //     handleLogin(username, password);
    //   } else {
    //     console.log("Login fall!");
    //   }
    // });
  };

  const onFinish = (values) => {
    const { username, password } = values;
    handleLogin(username, password);
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <DocumentTitle title={"User Login"}>
      <div className="login-container">
        <Form onFinish={onFinish} className="content">
          <div className="title">
            <h2>Login Form</h2>
          </div>
          <Spin spinning={loading} tip="Login...">
            <Form.Item name="username" rules={[{
              required: true,
              whitespace: true,
              message: "Please input username.",
            }]}>
                <Input
                  prefix={
                    <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="User Name"
                />

            </Form.Item>
            <Form.Item name="password" rules={[{
              required: true,
              whitespace: true,
              message: "Please input password.",
            }]}>
                <Input
                  prefix={
                    <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />

            </Form.Item>
            <Form.Item>
              <Button
                type="primary"

                className="login-form-button"
              >
                <Link to="/register">Register</Link>
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                // onClick={handleSubmit}
              >
                Login
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  );
};

// const WrapLogin = Form.create()(Login);
export default connect((state) => state.user, { login, getUserInfo })(
  Login
);
