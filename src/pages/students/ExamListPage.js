import React, {useEffect, useState} from 'react';
import {Radio, message, Carousel, Table, Tag, Space, Row, Button, Col} from 'antd';
import {API_CheckSession, API_ExamList, API_ExamPuzzles, API_ExamRecords, API_SubmitExam} from "../../api/api";
import {useNavigate} from "react-router-dom";


import './ExamListPage.css'; // 自定义样式

// latex代码渲染
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import {ArrowLeftOutlined, CheckCircleFilled, CloseCircleFilled} from "@ant-design/icons";

const ExamListPage = (props) =>  {

    const navigate = useNavigate();

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
        API_ExamList({"classId": props.selectedClass.classId}, (data) => {
            setExamList(data.data);
        })

    }, []);

    // 查询考试记录
    const fetchExamRecords = (record) => {
        API_ExamRecords({
            "groupId": record.groupId,
            "examName": record.examName,
        }, (data) => {
            setExamAnswerRecordList(data.data);
        })
    }

    // 查询一个新的考试
    const fetchExamPuzzles = (record) => {
        API_ExamPuzzles({"examName": record.examName, "groupId": record.groupId}, (data) => {
            setExamPuzzlesList(data.data)
        })
    }
    // 选项改变
    const handlePuzzleSelectChange = (puzzleId) => (e) => {
        examPuzzleSelectMap[String(puzzleId)] = String.fromCharCode('A'.charCodeAt(0) + e.target.value);
        setExamPuzzleSelectMap(examPuzzleSelectMap);
    };
    // 提交考试
    const submitExam = () => {
        let requestBody = {
            "studentName": props.selectedClass.studentName,
            "classId": props.selectedClass.classId,
            "className": props.selectedClass.className,
            "groupId": currentExam.groupId,
            "groupName": currentExam.groupName,
            "examName": currentExam.examName,
            "answers": examPuzzleSelectMap
        }
        API_SubmitExam(requestBody, (data) => {
            if (data.data === true) {
                message.success('提交成功');
            } else {
                message.error('提交失败, 请联系管理员');
            }
            returnFunc();
        })
    }

    const returnFunc = () => {
        props.resetClass();
        setCurrentExam({});
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
    const [currentExam, setCurrentExam] = useState({});

    const columns = [
        {
            title: '测试名称',
            dataIndex: 'examName',
            key: 'examName',
            render: (_, record) =>
                <Tag color="cyan" onClick={() => {
                    message.warning("暂不支持,敬请期待");
                }}>
                    {record.examName}
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
            key: 'status',
            dataIndex: 'status',
            render: (_, record ) => (
                <>
                    {
                        record.status === '未作答' ?
                            <Tag color="red">
                                {record.status}
                            </Tag>
                            :
                            record.status === '已作答' ?
                                <Tag color="green">
                                    {record.status}
                                </Tag>
                                :
                                // 可作答
                                <Tag color="green">
                                    {record.status}
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
                        record.status === '未作答' ?
                            <Space direction="horizontal" size="middle">
                                <a onClick={() => {
                                    fetchExamPuzzles(record);
                                    setShowExamList(false);
                                    setShowExamAnswerRecordList(false)
                                    setShowExamPaper(true);
                                    setCurrentExam(record);
                                }}>开始测试</a>
                            </Space>
                            :
                            record.status === '已作答' ?
                                <Space direction="horizontal" size="middle">
                                    <a onClick={() => {
                                        fetchExamRecords(record);
                                        setShowExamList(false);
                                        setShowExamPaper(false);
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
                    onClick={() => returnFunc()}
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

                                    <div className="image-row">
                                        <Row gutter={[16, 16]}> {/* 设置间距 */}
                                            {puzzle.images.map((url, index) => (
                                                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
                                                    {/* 每个图片等大小显示 */}
                                                    <div className="image-container">
                                                        <img src={url} alt={`Image ${index}`} className="image"/>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>

                                    <Row className="puzzleContentRowStyle">
                                        <MathJaxContext>
                                            <Radio.Group onChange={handlePuzzleSelectChange(puzzle_idx + 1)}>
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
                        {
                            examAnswerRecordList.map((puzzle, puzzle_idx) => (
                                <div className="puzzleContentStyle" key={puzzle_idx}>
                                    <Row className="puzzleContentRowStyle">
                                        <h4>{puzzle.status}</h4>
                                    </Row>
                                    <Row className="puzzleContentRowStyle">
                                        <MathJaxContext>
                                            <MathJax>
                                                <h3>{puzzle.content}</h3>
                                            </MathJax>
                                        </MathJaxContext>
                                    </Row>

                                    <div className="image-row">
                                        <Row gutter={[16, 16]}> {/* 设置间距 */}
                                            {puzzle.images.map((url, index) => (
                                                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
                                                    {/* 每个图片等大小显示 */}
                                                    <div className="image-container">
                                                        <img src={url} alt={`Image ${index}`} className="image"/>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>

                                    <Row className="puzzleContentRowStyle">
                                        <MathJaxContext>
                                            <Radio.Group disabled={true}>
                                                {
                                                    puzzle.choices.map((choice, choice_idx) => (
                                                        <Row key={choice_idx}>
                                                            <Radio value={choice_idx} className="answer-record-radio">
                                                                <MathJax>
                                                                    {
                                                                        // 给正确选项上绿色
                                                                        choice_idx === puzzle.answer.charCodeAt(0) - 'A'.charCodeAt(0) ?
                                                                            <div>
                                                                                <Row>
                                                                                    <CheckCircleFilled
                                                                                        style={{color: 'green'}}/>
                                                                                    <h3 style={{color: "green"}}>{choicesItem[choice_idx]}{choice}</h3>
                                                                                </Row>
                                                                            </div>
                                                                            :
                                                                            // 给你的错误选项上红色
                                                                            puzzle.yourChoice !== null && puzzle.yourChoice !== puzzle.answer && choice_idx === puzzle.yourChoice.charCodeAt(0) - 'A'.charCodeAt(0) ?
                                                                                <div>
                                                                                    <Row>
                                                                                        <CloseCircleFilled
                                                                                            style={{color: 'red'}}/>
                                                                                        <h3 style={{color: "red"}}>{choicesItem[choice_idx]}{choice}</h3>
                                                                                    </Row>
                                                                                </div>
                                                                                :
                                                                                <div>
                                                                                    <Row>
                                                                                        <CloseCircleFilled
                                                                                            style={{visibility: 'hidden'}}/>
                                                                                        <h3>{choicesItem[choice_idx]}{choice}</h3>
                                                                                    </Row>
                                                                                </div>
                                                                    }
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
                </Carousel>
                </div>
            )}

        </div>
    );
}

export default ExamListPage;