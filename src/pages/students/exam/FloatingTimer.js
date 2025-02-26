import React, { useState, useEffect, useRef } from 'react';
import './FloatingTimer.css';

const FloatingTimer = ({ initialMinutes, onTimerEnd }) => {
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const dragRef = useRef(null);
    const offsetRef = useRef({ x: 0, y: 0 });
    const startTimeRef = useRef(null);

    // 设置开始时间，仅在 startCountdown 变为 true 时执行一次
    useEffect(() => {
        if (initialMinutes > 0 && !startTimeRef.current) {
            startTimeRef.current = Date.now();

            const totalSeconds = initialMinutes * 60;
            const updateTimer = () => {
                const elapsedMs = Date.now() - startTimeRef.current;
                const elapsedSeconds = Math.floor(elapsedMs / 1000);
                const newTimeLeft = Math.max(totalSeconds - elapsedSeconds, 0);

                setTimeLeft(newTimeLeft);

                if (newTimeLeft <= 0) {
                    onTimerEnd();
                    return;
                }

                requestAnimationFrame(updateTimer);
            };

            let animationFrameId = requestAnimationFrame(updateTimer);
            return () => cancelAnimationFrame(animationFrameId);
        }
    }, [initialMinutes]);

    // 拖动事件绑定，只有在组件渲染后才执行
    useEffect(() => {
        const dragElement = dragRef.current;
        if (!dragElement) return; // 如果 dragRef.current 为 null，直接返回

        const handleStart = (e) => {
            const rect = dragElement.getBoundingClientRect();
            let clientX, clientY;

            if (e.type === 'touchstart') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            if (
                clientX >= rect.left &&
                clientX <= rect.right &&
                clientY >= rect.top &&
                clientY <= rect.bottom
            ) {
                setIsDragging(true);
                offsetRef.current = { x: clientX - position.x, y: clientY - position.y };
            }
        };

        const handleMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            let clientX, clientY;

            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            const newX = clientX - offsetRef.current.x;
            const newY = clientY - offsetRef.current.y;
            const maxX = window.innerWidth - dragElement.offsetWidth;
            const maxY = window.innerHeight - dragElement.offsetHeight;

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY)),
            });
        };

        const handleEnd = () => {
            setIsDragging(false);
        };

        dragElement.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);

        dragElement.addEventListener('touchstart', handleStart, { passive: false });
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);

        return () => {
            dragElement.removeEventListener('mousedown', handleStart);
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            dragElement.removeEventListener('touchstart', handleStart);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging, initialMinutes]); // 添加 startCountdown 作为依赖

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (initialMinutes < 0) return null; // 未开始时不渲染

    return (
        <div
            ref={dragRef}
            className={`floating-timer ${timeLeft <= 0 ? 'ended' : ''}`}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
            <div className="timer-header">倒计时</div>
            <div className="timer-content">
                {timeLeft > 0 ? formatTime(timeLeft) : '时间到！'}
            </div>
        </div>
    );
};

export default FloatingTimer;