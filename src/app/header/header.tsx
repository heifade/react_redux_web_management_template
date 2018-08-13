import * as React from "react";
import { Avatar, Layout } from "antd";

const styles = require("./header.less");

export class HeaderComponent extends React.Component {
  render() {
    return (
      <Layout.Header className={styles.appHeader}>
        <div className={styles.logo} />

        <Avatar size={54} icon="user" className={styles.avatar} />
      </Layout.Header>
    );
  }
}
