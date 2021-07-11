import React, { useState, useEffect } from 'react';
import {
    HashRouter as Router ,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import ListUI from '../components/ListUI';
import TableUI from '../components/TableUI';
import Dashboard from '../components/Dashboard';
import Analytics from '../components/Analytics';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu


const LayoutUI = ({ children }) => {



    let history = useHistory();
    const [collapsed, setCollapsed] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState(['transactions'])


    const onCollapse = () => {
        setCollapsed(!collapsed)
    };


    const linkTo = (item) => {
        setSelectedKeys((old) => [`${item.key}`])
    }
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" />
                    <Menu onClick={linkTo} theme="dark" defaultSelectedKeys={['transactions']} mode="inline" selectedKeys={selectedKeys}>

                        <Menu.Item key="transactions" icon={<PieChartOutlined />}>
                            <Link to="/">
                                <div style={{ fontSize: "22px" }}>
                                    Transactions
                                </div>

                            </Link>
                        </Menu.Item>
                        <Menu.Item key="dashboard" icon={<DesktopOutlined />}>
                            <Link to="/dashboard">
                                <div style={{ fontSize: "22px" }}>
                                    Dashboard
                                </div>
                            </Link>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    {/* <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        Bill is a cat.
                    </div>
                </Content> */}
                    <Switch>
                        <Route path="/">
                            {/* <ListUI /> */}
                            <TableUI/>
                        </Route>
                        <Route path="/dashboard">
                            {/* <ListUI /> */}
                            <Dashboard/>
                        </Route>
                    </Switch>
                    <Footer style={{ textAlign: 'center' }}>Banking App ©2021 Created by Mickael Zana </Footer>
                </Layout>
            </Layout>
        </Router>
    );

}

export default LayoutUI;