import React, { useEffect } from 'react';

const PageMonitor = () => {
    useEffect(() => {
        // 处理页面可见性变化
        const handleVisibilityChange = () => {
            if (document.hidden) {
                alert("考试期间禁止切换标签页！");
            }
        };

        // 处理窗口失去焦点（被其他应用覆盖）
        const handleBlur = () => {
            alert("请保持考试窗口处于激活状态！");
        };

        // 处理页面关闭/刷新
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '考试期间关闭页面将导致成绩无效！';
            return e.returnValue;
        };

        // 移动端页面隐藏事件
        const handlePageHide = (e) => {
            alert("检测到应用进入后台！");
        };

        // 添加事件监听
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('pagehide', handlePageHide);

        // 清理函数
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('pagehide', handlePageHide);
        };
    }, []);

    return (
        <div/>
    );
};

export default PageMonitor;