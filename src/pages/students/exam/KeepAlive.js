import React, { useEffect } from 'react';
import {API_Keepalive} from "../../../api/api";


const KeepAlive = () => {
    useEffect(() => {
        // 1分钟心跳检测
        const interval = setInterval(() => {
            API_Keepalive({}, ()=>{}, ()=>{})
        }, 60000);

        // 清理函数
        return () => clearInterval(interval);
    }, []);

    return (
        <div/>
    );
};

export default KeepAlive;