import * as React from "react";
import { Card, Form, Checkbox, Button, Input, Icon, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { localStorage } from "../module/common/localStorage";
import "antd/dist/antd.css";
import { loginService } from "./loginService";
import { promisify, wait } from "../module/common/utils";

let styles = require("./login.less");

class LoginComponent extends React.Component<FormComponentProps, any> {
  constructor(props: FormComponentProps, context: any) {
    super(props, context);
    this.state = {
      isShowLoading: false
    };
  }
  componentDidMount() {
    let loginData = localStorage.get("loginData");
    if (loginData) {
      this.props.form.setFieldsValue({
        userName: loginData.userName,
        password: loginData.password
      });
    }
  }
  onSubmitHandle = async e => {
    e.preventDefault();

    let values;
    try {
      values = await promisify(this.props.form.validateFields)();
    } catch (e) {
      return;
    }


    this.setState({
      isShowLoading: true
    });

    try {
      let result = await loginService.login(values);
      if (result) {
        window.location.href = "./index.html";
      }
    } catch (e) {
      message.error(e.message);
    }

    this.setState({
      isShowLoading: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isShowLoading } = this.state;
    return (
      <React.Fragment>
        <div className={styles.divBack} />
        <Card title="登录" bordered={true} className={styles.divLogin}>
          <Form onSubmit={this.onSubmitHandle} className={styles.loginForm}>
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "请输入用户名" }]
              })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="用户名" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码" }]
              })(<Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="密码" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>记住</Checkbox>)}
              {/* <a className={styles.loginFormForgot} href="">
                Forgot password
              </a> */}
              <Button type="primary" htmlType="submit" className={styles.loginFormButton} loading={isShowLoading}>
                登录
              </Button>
              {/* Or <a href="">register now!</a> */}
            </Form.Item>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

export let LoginComponentForm = Form.create()(LoginComponent);
