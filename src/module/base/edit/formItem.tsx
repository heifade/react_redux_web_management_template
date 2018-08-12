import * as React from "react";
import { Col, Form } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const colLayout = {
  xs: { span: 24 },
  sm: { span: 12 },
  // md: { span: 8 }
};

interface FormItemProps {
  label: string;
}

export class FormItemComponent extends React.Component<FormItemProps, any> {
  render() {
    let { label, children } = this.props;
    return (
      <Col {...colLayout}>
        <Form.Item label={label} {...formItemLayout}>
          {children}
        </Form.Item>
      </Col>
    );
  }
}


