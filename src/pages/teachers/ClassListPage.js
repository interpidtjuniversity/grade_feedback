import React, {useEffect, useState} from 'react';
import {Modal, Row, Col, Card, Avatar, Form, Input, Button, Space, Table, message} from 'antd';
import {API_CreateClass, API_QueryClasses } from "../../api/api";
import {useNavigate} from "react-router-dom";


import './ClassListPage.css'; // 自定义样式

import {
    GroupOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
    PlusOutlined,
    UserOutlined
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import TextArea from "antd/es/input/TextArea";

const ClassListPage = () =>  {

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        // API_CheckSession({}, (data) => {
        //     if (data === false) {
        //         navigate('/login', {replace: true})
        //     } else {
        //
        //     }
        // }, (err) => {
        //     if (err !== null) {
        //         navigate('/login', {replace: true})
        //     }
        // })
        API_QueryClasses({}, (data) => {
            setClasses(data.data);
        })

    }, []);

    // 班级列表
    const [classes, setClasses] = useState([]);
    // 班级新建
    const [createNewClassForm] = Form.useForm();
    const [openCreateNewClass, setOpenCreateNewClass] = useState(false);
    // 学生列表
    const [openClassStudentsList, setOpenClassStudentsList] = useState(false);
    const [classStudentsList, setClassStudentsList] = useState([]);
    const studentListColumns = [
        {
            title: '学号',
            dataIndex: 'studentId',
            key: 'studentId',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '姓名',
            dataIndex: 'studentName',
            key: 'studentName',
            render: (text) => <a>{text}</a>,
        }

    ];
    // 分组列表
    const [openClassGroupsList, setOpenClassGroupsList] = useState(false);
    const [classGroupsList, setClassGroupsList] = useState([]);
    const groupListColumns = [
        {
            title: '组名称',
            dataIndex: 'groupName',
            key: 'groupName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '分组策略',
            dataIndex: 'groupingStrategy',
            key: 'groupingStrategy',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '分组信息',
            dataIndex: 'groupingInfo',
            key: 'groupingInfo',
            render: (text) => <a>{text}</a>,
        }

    ];


    const openCreateNewClassModal = () => {
        setOpenCreateNewClass(true);
    }
    const closeCreateNewClassModal = () => {
        createNewClassForm.resetFields(); // 清空表单
        setOpenCreateNewClass(false);
    }
    const openClassKeyListModal = (key, value, data) => {
        if (key === "openClassStudentsList") {
            setOpenClassStudentsList(value);
            if (value) {
                let list = [];
                new Map(data).forEach((v, k) => {
                    list.push({
                        "studentId": k,
                        "studentName": v,
                    })
                })
                setClassStudentsList(list);
            } else {
                setClassStudentsList([]);
            }
        } else if (key === "openClassGroupsList") {
            setOpenClassGroupsList(value);
            if (value) {
                setClassGroupsList(data);
            } else {
                setClassGroupsList([]);
            }
        }
    }

    const submitCreateNewClassModal = () => {
        createNewClassForm.validateFields()
            .then((values) => {
                // 设置初始信息
                let createRequest = {
                    "className":values.className,
                    "groupClassInfoModel":[],
                    "studentClassInfoModel":{
                        "className":values.className,
                        "students":{}
                    }
                };
                // 设置分组信息
                values.groups.forEach((v, idx) => {
                    createRequest["groupClassInfoModel"].push({
                        "className":values.className,
                        "groupName":v.groupName,
                        "groupingInfo":v.groupingInfo,
                        "groupingStrategy":v.groupingStrategy
                    });
                })
                // 设置学生信息
                let students = values.studentsInfo.split("\n");
                students.forEach((v, idx) => {
                    let student = v.split(",");
                    createRequest["studentClassInfoModel"]["students"][student[0]] = student[1]
                })

                // 创建班级
                API_CreateClass(createRequest, (data) => {
                    if (data.data === true) {
                        messageApi.open({
                            type: 'success',
                            content: '班级创建成功',
                        });
                        closeCreateNewClassModal();
                    } else {
                        messageApi.open({
                            type: 'error',
                            content: '班级创建失败, 请稍后再试',
                        });
                    }
                })
            })
            .catch((error) => {
            });
    }

    return (
        <div>
            {contextHolder}
            <Row>
            {
                classes.map((c, cIdx) => (
                    <Col span={6} key={cIdx}>
                        <Card
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <UserOutlined key="student" onClick={() => openClassKeyListModal("openClassStudentsList", true, Object.entries(c.studentClassInfoModel.students))}/>,
                                <GroupOutlined key="group" onClick={() => openClassKeyListModal("openClassGroupsList", true, c.groupClassInfoModel)}/>
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                                title={c.className}
                                description={
                                    <div>
                                        <div>{new Map(Object.entries(c.studentClassInfoModel.students)).size}人</div>
                                        <div>{c.groupClassInfoModel.length}组</div>
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                ))
            }
                <Col span={6}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        size={"default"}
                    >
                        <Meta
                            description={
                                <div
                                    style={{
                                        display: 'grid',
                                        placeItems: 'center', // 水平和垂直居中
                                    }}
                                >
                                    <div style={{height:"10vh", paddingTop:"15%"}}>新建班级</div>
                                    <Avatar
                                        size={50}
                                        style={{
                                            backgroundColor: '#87d068',
                                        }}
                                        icon={<PlusCircleOutlined/>}
                                        onClick={openCreateNewClassModal}
                                    />
                                </div>
                            }
                        />
                    </Card>
                </Col>
            </Row>

            {/*新建班级的浮窗*/}
            <Modal title="新建班级" open={openCreateNewClass} footer={null} onCancel={closeCreateNewClassModal}>
                <Form layout="horizontal" form={createNewClassForm} validateTrigger="onSubmit">
                    <Form.Item label="班级名称" name="className"
                               rules={[
                                   {
                                       required: true,
                                       message: '请输入班级名称!',
                                   },
                               ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="学生名单" name="studentsInfo"
                               rules={[
                                   {
                                       required: true,
                                       message: '请录入学生信息!',
                                   },
                               ]}>
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.List name="groups">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'groupName']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入组标识',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="组标识" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'groupingStrategy']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入分组策略',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="分组策略" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'groupingInfo']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入分组信息',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="分组信息" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        添加分组
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item>
                        <Space>
                            <Button type="primary" onClick={submitCreateNewClassModal}>
                                提交
                            </Button>
                            <Button type="primary" onClick={closeCreateNewClassModal}>
                                取消
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/*查看班级学生列表的浮窗*/}
            <Modal title="学生列表" open={openClassStudentsList} footer={null} onCancel={() => {openClassKeyListModal("openClassStudentsList", false, null)}}>
                <Table columns={studentListColumns} dataSource={classStudentsList} rowKey='studentId'/>
            </Modal>

            {/*查看班级分组列表的浮窗*/}
            <Modal title="分组列表" open={openClassGroupsList} footer={null} onCancel={() => {openClassKeyListModal("openClassGroupsList", false, null)}}>
                <Table columns={groupListColumns} dataSource={classGroupsList} rowKey='groupId'/>
            </Modal>
        </div>
    );
}

export default ClassListPage;