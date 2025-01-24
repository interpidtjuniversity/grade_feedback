import React, {useEffect, useState} from 'react';
import {Radio, message, Carousel, Table, Tag, Space, Row, Button} from 'antd';
import {API_CheckSession, API_ExamPuzzles } from "../../api/api";
import {useNavigate} from "react-router-dom";


import './ExamListPage.css'; // 自定义样式

// latex代码渲染
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import {ArrowLeftOutlined} from "@ant-design/icons";

const ExamListPage = (props) =>  {

    const navigate = useNavigate();

    const mockExamListData = [
        {
            "id":"1",
            "examId":"第一章前侧",
            "startTime":"2025-01-01 12:00",
            "endTime":"2025-01-02 12:00",
            "examStatus":"已结束"
        },
        {
            "id":"2",
            "examId":"第一章后侧",
            "startTime":"2025-01-01 12:00",
            "endTime":"2025-01-02 12:00",
            "examStatus":"可作答"
        },
        {
            "id":"3",
            "examId":"第二章前侧",
            "startTime":"2025-01-01 12:00",
            "endTime":"2025-01-02 12:00",
            "examStatus":"未开始"
        }
    ]

    const choicesItem = ["A.", "B.", "C.", "D.", "E.", "F.", "G.", "H.", "I."];

    useEffect(() => {
        // API_CheckSession({}, (data) => {
        //     if (data === false) {
        //         navigate('/login', {replace: true})
        //     } else {
        //         setExamList(mockExamListData);
        //     }
        // }, (err) => {
        //     if (err !== null) {
        //         navigate('/login', {replace: true})
        //     }
        // })

    }, []);

    // 查询一个新的考试
    const fetchExamPuzzles = (record) => {
        API_ExamPuzzles({"examId": record.examId}, (data) => {
            setExamPuzzlesList(data.data)
        })
    }
    // 选项改变
    const handlePuzzleSelectChange = (puzzleId) => (e) => {
        examPuzzleSelectMap[puzzleId] = String.fromCharCode('A'.charCodeAt(0) + e.target.value);
        setExamPuzzleSelectMap(examPuzzleSelectMap);
    };
    // 提交考试
    const submitExam = () => {
        console.log(examPuzzleSelectMap);
    }

    // 考试列表
    const [reloadKey, setReloadKey] = useState(0);
    const [examList, setExamList] = React.useState([]);
    const [showExamList, setShowExamList] = useState(true);
    // 考试作答记录展示与隐藏
    const [showExamAnswerRecordList, setShowExamAnswerRecordList] = useState(false);
    const [examAnswerRecordList, setExamAnswerRecordList] = useState([]);
    // 考试答题展示与隐藏
    const [showExamPaper, setShowExamPaper] = useState(false);
    const [examPuzzlesList, setExamPuzzlesList] = useState([]);
    const [examPuzzleSelectMap, setExamPuzzleSelectMap] = useState({});

    const columns = [
        {
            title: '测试名称',
            dataIndex: 'examId',
            key: 'examId',
            render: (_, record) =>
                <Tag color="cyan" onClick={() => {
                    message.warning("暂不支持,敬请期待");
                }}>
                    {record.examId}
                </Tag>,
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: '测试状态',
            key: 'examStatus',
            dataIndex: 'examStatus',
            render: (_, record ) => (
                <>
                    {
                        record.examStatus === '已结束' ?
                            <Tag color="red">
                                {record.examStatus}
                            </Tag>
                            :
                            record.examStatus === '未开始' ?
                                <Tag color="orange">
                                    {record.examStatus}
                                </Tag>
                                :
                                // 可作答
                                <Tag color="green">
                                    {record.examStatus}
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
                        record.examStatus === '可作答' ?
                            <Space direction="horizontal" size="middle">
                                <a onClick={() => {
                                    fetchExamPuzzles(record);
                                    setShowExamList(false);
                                    setShowExamAnswerRecordList(false)
                                    setShowExamPaper(true);
                                }}>开始测试</a>
                            </Space>
                            :
                            record.examStatus === '已结束' ?
                                <Space direction="horizontal" size="middle">
                                    <a onClick={() => {
                                        setShowExamList(false);
                                        setShowExamPaper(false)
                                        setShowExamAnswerRecordList(true);
                                    }}>查看试卷</a>
                                </Space>
                                :
                                <Space direction="horizontal" size="middle">
                                </Space>
                    }
                </>
            ),
        },
    ];

    return (
        <div>
            <Row
                align="middle"
                justify="space-between"
                style={{
                    padding: '16px',
                    backgroundColor: '#f0f2f5',
                    borderRadius: '8px',
                    marginBottom: '16px',
                }}
            >
                <Tag
                    color="success"
                    style={{
                        fontSize: '16px',
                        padding: '8px 12px',
                        borderRadius: '20px',
                    }}
                >
                    {props.selectedClass.className}
                </Tag>
                <Button
                    type="primary"
                    icon={<ArrowLeftOutlined />} // 添加返回图标
                    onClick={() => props.resetClass()}
                    style={{
                        borderRadius: '20px',
                        padding: '8px 16px',
                        height: 'auto',
                    }}
                >
                    返回
                </Button>
            </Row>

            {showExamList && (
                <Table key={reloadKey} columns={columns} dataSource={examList} rowKey={'id'}/>
            )}
            {showExamPaper && (
                <div>
                    <Carousel>
                        {
                            examPuzzlesList.map((puzzle, puzzle_idx) => (
                                <div className="puzzleContentStyle" key={puzzle_idx}>
                                    <Row className="puzzleContentRowStyle">
                                            <MathJaxContext>
                                                <MathJax>
                                                    <h3>{puzzle.content}</h3>
                                                </MathJax>
                                            </MathJaxContext>
                                    </Row>

                                    <Row>

                                    </Row>
                                    <Row className="puzzleContentRowStyle">
                                        <MathJaxContext>
                                            <Radio.Group onChange={handlePuzzleSelectChange(puzzle_idx)}>
                                                {
                                                    puzzle.choices.map((choice, choice_idx) => (
                                                        <Row key={choice_idx}>
                                                            <Radio value={choice_idx}>
                                                                <MathJax>
                                                                    <h3>{choicesItem[choice_idx]}{choice}</h3>
                                                                </MathJax>
                                                            </Radio>
                                                        </Row>
                                                    ))
                                                }
                                            </Radio.Group>
                                        </MathJaxContext>
                                    </Row>
                                </div>
                            ))
                        }
                        {
                            <div>
                                <Button type="primary" onClick={submitExam}>提交</Button>
                            </div>
                        }
                    </Carousel>
                </div>
            )}
            {showExamAnswerRecordList && (
                <div>
                    <Carousel>
                        <div>
                            <h3 className="puzzleContentStyle">1</h3>
                        </div>
                        <div>
                            <h3 className="puzzleContentStyle">2</h3>
                        </div>
                        <div>
                            <h3 className="puzzleContentStyle">3</h3>
                        </div>
                        <div>
                            <h3 className="puzzleContentStyle">4</h3>
                        </div>
                    </Carousel>
                </div>
            )}

        </div>
    );
}

export default ExamListPage;