import { API_CheckSession} from "../api/api";
import { PlusOutlined } from '@ant-design/icons';
import { Table, Space, Tag, Drawer, Upload, Image, Input, Col, Row, Card, Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import React from "react"

import { API_Upload} from "../api/api";

const { TextArea } = Input;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


const FeedBackListPage = () =>  {
    const navigate = useNavigate();

    useEffect(() => {
        API_CheckSession({}, (data) => {
            if (data === false) {
                navigate('/login', {replace: true})
            }
        }, (err) => {
            if (err !== null) {
                navigate('/login', {replace: true})
            }
        })
    }, []);

    const feedBack = (record) => {
        setOpen(true)
        setLoading(true)
        drawerData.current = record
        setLoading(false);
    }
    const cancelFeedBack = (record) => {
        console.log(record);
    }

    const review = (record) => {
        console.log(record);
    }

    // 反馈弹窗
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    // 弹窗原始数据
    const drawerData = React.useRef({});
    // 反馈内容
    const [feedbackText, setFeedbackText] = React.useState("");
    // 图片上传
    const [urlMap, setUrlMap] = React.useState({})
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [fileList, setFileList] = React.useState([])
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const handleUpload = (file) => {
        let fileId = file.file.uid
        API_Upload(file, (data) => {
            if (data !== null) {
                for (let i = 0; i < fileList.length; i++) {
                    if (fileList[i].uid === fileId) {
                        fileList[i].status = 'done';
                    }
                }
                // 保存上传成功后的文件oss的url
                urlMap[fileId] = data
                setFileList(fileList);
                setUrlMap(urlMap);
            }
        })
    }

    const submitForm = () => {
        console.log(drawerData.current.id);
        console.log(drawerData.current.studentId);
        console.log(drawerData.current.studentName);
        console.log(drawerData.current.examName);
        console.log(feedbackText);

        var images = []
        for (let i = 0; i < fileList.length; i++) {
            if (urlMap[fileList[i].uid] !== undefined) {
                images.push(urlMap[fileList[i].uid]);
            }
        }
        console.log(images);
    }

    const closeDrawer = () => {
        setOpen(false);
        setLoading(false);
        setFeedbackText("");
        setFileList([]);
        setPreviewOpen(false);
        setPreviewImage('')
        setPreviewTitle('')
    }


    const columns = [
        {
            title: '姓名',
            dataIndex: 'studentName',
            key: 'studentName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '学号',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: '测试名称',
            dataIndex: 'examName',
            key: 'examName',
            render: (_, record) => <a onClick={() => {
                window.open(record.examUrl, '_blank');
            }}>{record.examName}</a>,
        },
        {
            title: '反馈',
            key: 'feedBackStatus',
            dataIndex: 'feedBackStatus',
            render: (_, record ) => (
                <>
                    {
                        record.feedBackStatus === '未反馈' ?
                            <Tag color="red">
                                {record.feedBackStatus}
                            </Tag>
                            :
                            <Tag color="green">
                                {record.feedBackStatus}
                            </Tag>
                    }
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    {
                        record.feedBackStatus === '未反馈' ?
                            <Space direction="horizontal" size="middle">
                                <a onClick={() => {
                                    review(record);
                                }}>查看</a>

                                <a onClick={() => {
                                    feedBack(record);
                                }}>反馈</a>
                            </Space>
                            :
                            <Space direction="horizontal" size="middle">
                                <a onClick={() => {
                                    review(record);
                                }}>查看</a>

                                <a onClick={() => {
                                    cancelFeedBack(record);
                                }}>取消反馈</a>
                            </Space>

                    }
                </>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            studentName: '崔垚',
            studentId: '20241878',
            examName: '7.2前测',
            examUrl: 'https://www.baidu.com',
            feedBackStatus: '未反馈',
        },
        {
            id: 2,
            studentName: '崔垚',
            studentId: '20241878',
            examName: '7.2后测',
            examUrl: 'https://www.baidu.com',
            feedBackStatus: '已反馈',
        },
        {
            id: 3,
            studentName: '崔垚',
            studentId: '20241878',
            examName: '7.4前测',
            examUrl: 'https://www.baidu.com',
            feedBackStatus: '未反馈',
        },
        {
            id: 4,
            studentName: '崔垚',
            studentId: '20241878',
            examName: '7.4后测',
            examUrl: 'https://www.baidu.com',
            feedBackStatus: '已反馈',
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} rowKey={'id'} />
            <Drawer
                width="75%"
                closable
                destroyOnClose
                title={<p>反馈</p>}
                placement="right"
                open={open}
                loading={loading}
                onClose={closeDrawer}
            >

                <div>
                    <Space
                        direction="vertical"
                        size={30}
                        style={{
                            display: 'flex',
                        }}
                    >
                        <Card hoverable style={{ width: "95%", marginLeft: "1%" }}>
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <Row>
                                    <Tag color="green">基本信息</Tag>
                                </Row>
                                <Row>
                                    <Col span={6}>
                                        <Row>
                                            <Col>
                                                <Tag color="cyan">编号:</Tag>
                                            </Col>
                                            <Col>
                                                {drawerData.current.id}
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col span={6}>
                                        <Row>
                                            <Col>
                                                <Tag color="cyan">学号:</Tag>
                                            </Col>
                                            <Col>
                                                {drawerData.current.studentId}
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col span={6}>
                                        <Row>
                                            <Col>
                                                <Tag color="cyan">姓名:</Tag>
                                            </Col>
                                            <Col>
                                                {drawerData.current.studentName}
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col span={6}>
                                        <Row>
                                            <Col>
                                                <Tag color="cyan">测试名称:</Tag>
                                            </Col>
                                            <Col>
                                                {drawerData.current.examName}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Space>
                        </Card>

                        <Card style={{ width: "95%", marginLeft: "1%" }}>
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <Row>
                                    <Tag color="green">反馈信息</Tag>
                                </Row>
                                <Row>
                                    <TextArea
                                        value={feedbackText}
                                        onChange={(e) => setFeedbackText(e.target.value)}
                                        placeholder="请输入反馈信息"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                </Row>
                            </Space>
                        </Card>

                        <Card style={{ width: "95%", marginLeft: "1%" }}>
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <Row>
                                    <Tag color="green">上传凭证</Tag>
                                </Row>
                                <Row>
                                    <Upload
                                        action="http://127.0.0.1:8080/grade_feedback/api/upload"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                        customRequest={handleUpload}
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                    {previewImage && (
                                        <Image
                                            wrapperStyle={{
                                                display: 'none',
                                            }}
                                            preview={{
                                                visible: previewOpen,
                                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                            }}
                                            src={previewImage}
                                        />
                                    )}
                                </Row>
                            </Space>
                        </Card>

                        <Row style={{
                            float: "right",
                            marginRight: "4%"
                        }}>
                            <Button type="primary" onClick={submitForm}>提交</Button>
                        </Row>
                    </Space>
                </div>
            </Drawer>
        </div>
    );
}

export default FeedBackListPage;