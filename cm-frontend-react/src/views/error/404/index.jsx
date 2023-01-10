import React from "react";
import { Button, Row, Col } from "antd";
import errImg from "@/assets/images/404.png";
import "./index.less";

const NotFound = (props) => {
  const { history } = props;
  const goHome = () => history.replace("/");
  return (
    <Row className="not-found">
      <Col span={12}>
        <img src={errImg} alt="404" />
      </Col>
      <Col span={12} className="right">
        <h1>404</h1>
        <h2>Sorry, you have come to a wasteland without knowledge.</h2>
        <div>
          <Button type="primary" onClick={goHome}>
            Back to Dashboard
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default NotFound;
