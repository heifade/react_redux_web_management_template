import * as React from "react";
import { Cascader } from "antd";
let styles = require("./select.less");

interface SelectProps {
  options: Array<{
    text: string;
    value: string;
  }>;

  value: string;
  placeholder: string;
  addonBefore: string;
  onChange: (value: string) => void;
}

export class Select extends React.Component<SelectProps, any> {
  onChange(value: any) {
    if (this.props.onChange) {
      this.props.onChange(value[0]);
    }
  }

  render() {
    let options = this.props.options.map((item: any, index: number) => {
      return {
        label: item.text,
        value: item.value
      };
    });

    let value = [this.props.value];

    let { placeholder, addonBefore } = this.props;

    let input = <Cascader options={options} onChange={this.onChange.bind(this)} value={value} placeholder={placeholder} allowClear={false} popupClassName={styles.popup} />;

    if (addonBefore) {
      return (
        <span className={styles.table}>
          <span className={styles.label}>{addonBefore}</span>
          <span className={styles.input}>{input}</span>
        </span>
      );
    }

    return input;
  }
}
