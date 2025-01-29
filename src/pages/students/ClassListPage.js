import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Avatar, message} from 'antd';
import {useNavigate} from "react-router-dom";


import './ClassListPage.css'; // 自定义样式

import Meta from "antd/es/card/Meta";
import {FileTextOutlined} from "@ant-design/icons";
import {API_ClassList} from "../../api/api";

const ClassListPage = (props) =>  {

    const navigate = useNavigate();

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
        API_ClassList({}, (data) => {
            setClasses(data.data);
        })

    }, []);

    // 班级列表
    const [classes, setClasses] = useState([]);

    return (
        <div>
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
                                <FileTextOutlined key="exam" onClick={() => props.selectClassFunc(c)}/>
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                                title={c.className}
                                description={
                                    <div>
                                        <div>{new Map(Object.entries(c.students)).size}人</div>
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                ))
            }
            </Row>
        </div>
    );
}

export default ClassListPage;