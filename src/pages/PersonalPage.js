import React from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import {API_UpdatePassWord} from "../api/api";
import {useNavigate} from "react-router-dom";

const PersonalPage = () =>  {

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const validatePassword = (_, value) => {
        const passwordRegex = /^[A-Za-z0-9]{8,18}$/;
        if (!value) {
            return Promise.reject(new Error('请输入新密码'));
        }
        if (!passwordRegex.test(value)) {
            return Promise.reject(new Error('密码长度18位且只能包含字母和数字'));
        }
        return Promise.resolve();
    };

    const onFinish = (values) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error('密码不匹配!');
        } else {
            API_UpdatePassWord({
                studentId: localStorage.getItem("studentId"),
                password: values.newPassword
            }, (data)=>{
                if (data === true) {
                    message.success("密码修改成功,请重新登陆");
                    navigate('/login', {replace: true})
                } else {
                    message.error("密码修改失败");
                }
            }, (error)=>{
                message.error("密码修改失败" + error.message);
            });
        }
    };

    return (
        <Card hoverable title="修改密码" bordered={true}>
            <Form
                form={form}
                name="password-change"
                onFinish={onFinish}
                layout="vertical"
                style={{ maxWidth: '400px', margin: '0 auto' }}
            >
                <Form.Item
                    name="newPassword"
                    label="输入新密码"
                    rules={[
                        { required: true, validator: validatePassword }
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="输入新密码"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="确认新密码"
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                        { required: true, message: '请确认新密码' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('密码不匹配'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="确认新密码"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default PersonalPage;