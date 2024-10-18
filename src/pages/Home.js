import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {Layout, Menu, theme, Button} from 'antd';
import FeedBackListPage from "./FeedBackListPage";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';


const { Header, Sider, Content } = Layout;
const items = [
    {
        key: '1',
        icon: <MailOutlined />,
        label: '反馈列表',
    },
    {
        key: '2',
        icon: <SettingOutlined />,
        label: '个人管理',
    }
];
const levelKeys = {
    '1':1,
    '2':1
}
const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onClick = (item) => {
        console.log(item);
    }


    return (
        <Layout style={{"height": "100%"}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    mode="vertical"
                    defaultSelectedKeys={['1']}
                    onClick={onClick}
                    style={{
                        width: "100%",
                        height: "50%"
                    }}
                    items={items}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content>
                    <FeedBackListPage/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Home;