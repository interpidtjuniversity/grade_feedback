// src/LoginPage.js
import { API_Login} from "../api/api";
import React from 'react';
import { Form, Input, Button, Card } from 'antd'; // Ant Design 示例
import './LoginPage.css'; // 自定义样式
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navigate = useNavigate();
    const onFinish = (values) => {
        API_Login(values, (data) => {
            if (data.code === "100") {
                localStorage.setItem("token", data.token);
                navigate('/home', {replace: true})
            }
        });
    };

    return (
        <div className="login-container">
            <Card title="登录" className="login-card">
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="studentId"
                        rules={[{ required: true, message: '请输入学号！' }]}
                    >
                        <Input placeholder="学号" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码！' }]}
                    >
                        <Input.Password placeholder="密码,默认为学号+姓名首字母小写" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage;
