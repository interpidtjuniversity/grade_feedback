import React, { useState } from 'react';
import {MailOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {Layout, Menu, theme, Button} from 'antd';
import FeedBackListPage from "./FeedBackListPage";
import PersonalPage from "./PersonalPage";
import ExamListPage from "./ExamListPage";
import ClassListPage from "./ClassListPage";
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
    },
    {
        key: '3',
        icon: <UserOutlined />,
        label: '我的班级'
    }
];

const StudentHome = () => {
    const [collapsed, setCollapsed] = useState(false);
    // 默认展示反馈列表
    const [componentKey, setComponentKey] = useState('1');
    // 是否选中了classId
    const [classInfo, setClassInfo] = useState(null);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onClick = (item) => {
        setComponentKey(item.key);
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
                    {componentKey === '1' && <FeedBackListPage/>}
                    {componentKey === '2' && <PersonalPage/>}
                    {componentKey === '3' && classInfo === null && <ClassListPage selectClassFunc={setClassInfo}/>}
                    {componentKey === '3' && classInfo !== null && <ExamListPage selectedClass={classInfo} resetClass={()=>setClassInfo(null)}/>}
                </Content>
            </Layout>
        </Layout>
    );
};
export default StudentHome;