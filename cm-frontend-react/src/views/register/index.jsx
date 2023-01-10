import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";
import {register} from '@/api/login'
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {validEmail} from "../../utils/validate";

const Register = (props) => {
  const { form, token, login, getUserInfo, history } = props;
  // const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);

  const handleRegister = (fullname, username, password, email) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    const params = {
      fullname: fullname,
      username: username,
      password: password,
      email: email
    }

    register(params).then((data) => {
        message.success("Register Success!");
        setLoading(false);
        history.push("/login")
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });

  };


  const handleSubmit = (values) => {
    // 阻止事件的默认行为
    // event.preventDefault();
    const {fullname, username, password, email} = values
    handleRegister(fullname, username, password, email);
    // 对所有表单字段进行检验
    // form.validateFields((err, values) => {
    //   // 检验成功
    //   if (!err) {
    //     console.log(values)
    //     const {fullname, username, password, email} = values
    //     handleRegister(fullname, username, password, email);
    //   } else {
    //     console.log("检验失败!");
    //   }
    // });
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <DocumentTitle title={"User Register"}>
      <div className="login-container">
        <Form onFinish={handleSubmit} className="content">
          <div className="title">
            <h2>User Register</h2>
          </div>
          <Spin spinning={loading} tip="Register...">
            <Form.Item name="fullname" rules={[{
              required: true,
              whitespace: true,
              message: "Please input Full Name.",
            }]}>
              <Input
                prefix={
                  <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Full Name"
              />

            </Form.Item>
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
              <Input.Password prefix={
                <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
              }/>
            </Form.Item>
            <Form.Item
              name="confirm"
              label=""
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              {/*<Input*/}
              {/*  prefix={*/}
              {/*    <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />*/}
              {/*  }*/}
              {/*  type="password"*/}
              {/*  placeholder="Password"*/}
              {/*/>*/}
              <Input.Password prefix={
                <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
              }/>
            </Form.Item>
            <Form.Item name="email" rules={[{
              required: true,
              whitespace: true,
              message: "Please input email address.",
            },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (validEmail(getFieldValue('email'))) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Please input right email address'));
                },
              }),]}>
              <Input
                prefix={
                  <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />

            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
              <Button
                type="primary"
                // htmlType="submit"
                className="login-form-button"
              >
                <Link to="/login">Back</Link>
              </Button>
            </Form.Item>

          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  );
};

// const WrapRegister = Form.create()(Register);

export default connect((state) => state.user, { login, getUserInfo })(
  Register
);
