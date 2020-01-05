import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const { Footer, Sider } = Layout;
import "./MainLayout.less";

export default class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          {this.state.collapsed ? (
            <div className="logo">W</div>
          ) : (
            <div className="logo">Work Measurement Admin</div>
          )}
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Link to={"/"}>
                <Icon type="home" />
                <span className="menu-item-link">Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={"/users"}>
                <Icon type="user" />
                <span className="menu-item-link">Users</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={"/issues"}>
                <Icon type="issues-close" />
                <span className="menu-item-link">Issues</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}> */}
          {this.props.children}
          {/* </div> */}
          <Footer style={{ textAlign: "center" }}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Nikhil-Kumaran/reactjs-boilerplate"
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.npmjs.com/package/reactjs-boilerplate"
            >
              npm
            </a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
