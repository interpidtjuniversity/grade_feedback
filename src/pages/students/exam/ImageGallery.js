import React from 'react';
import { Row, Col, Image } from 'antd';
import 'antd/dist/reset.css';

const ImageGallery = ({ imageUrls }) => {
    // 计算布局参数
    const getLayoutConfig = () => {
        const count = imageUrls.length;

        return {
            span: {
                1: 6,   // 单图
                2: 6,   // 双图
                3: 6,    // 三图
                4: 6     // 四图
            }[count] || 24,

            gutter: count === 1 ? [0, 0] : [8, 8] // 更紧凑的间距
        };
    };

    const { span, gutter } = getLayoutConfig();

    return (
        <div
            style={{
                height: '60%', // 控制整体高度为视口的1/5
                margin: '0 auto',
                width: '60%'    // 控制宽度避免拉伸变形
            }}
        >
            <Row
                gutter={gutter}
                justify="center"
                wrap={false}
                style={{ height: '100%' }} // 继承容器高度
            >
                {imageUrls.map((url, index) => (
                    <Col key={index} span={span} style={{ height: '100%' }}>
                        <div
                            style={{
                                height: '100%',
                                padding: 4, // 内边距防止图片粘连
                                boxSizing: 'border-box',
                                display: 'flex',
                                alignItems: 'center', // 垂直居中
                                justifyContent: 'center' // 水平居中
                            }}
                        >
                            <Image
                                src={url}
                                alt={`图片 ${index + 1}`}
                                preview={{ mask: null }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    borderRadius: 4,
                                    cursor: 'pointer'
                                }}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

// 使用示例
export default ImageGallery