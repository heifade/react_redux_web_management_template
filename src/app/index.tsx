import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppComponent } from "./app";
import "antd/dist/antd.css";

let div = document.createElement("div");
document.body.appendChild(div);

ReactDOM.render(<AppComponent />, div);

// import { Layout, Menu, Icon } from "antd";

// const { Header, Sider, Content } = Layout;

// class SiderDemo extends React.Component {
//   state = {
//     collapsed: false
//   };

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed
//     });
//   };

//   render() {
//     return (
//       <Layout>
//         <Header>
//           <Icon className="trigger" type={this.state.collapsed ? "menu-unfold" : "menu-fold"} onClick={this.toggle} />
//         </Header>

//         <Layout>
//           <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
//             <div className="logo" />
//           </Sider>
//           <Layout>
//             <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", minHeight: 280 }}>Content</Content>
//           </Layout>
//         </Layout>
//       </Layout>
//     );
//   }
// }

// ReactDOM.render(<SiderDemo />, div);
