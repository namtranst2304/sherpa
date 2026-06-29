'use client';

import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
    /** Speed of the matrix rain in milliseconds per frame. Lower is faster. Default: 50 */
    speed?: number;
    color?: string;
    opacity?: number;
}

export const MatrixRain = ({ speed = 50, color = '#00f3ff', opacity = 0.2 }: MatrixRainProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        // Destiny Vex-like / Tech characters
        const symbols = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$*&%';
        
        const fontSize = 14;
        let columns = canvas.width / fontSize;
        let drops: number[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100;
        }

        // --- RAF-based rendering with frame throttling ---
        let rafId: number | null = null;
        let lastFrameTime = 0;
        const paused = { current: false };

        const draw = () => {
            // Translucent black background to create trail effect
            ctx.fillStyle = 'rgba(15, 17, 21, 0.1)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = color;
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                if (drops[i] < 0) {
                    drops[i]++;
                    continue;
                }

                const text = symbols[Math.floor(Math.random() * symbols.length)];

                if (Math.random() > 0.95) {
                    ctx.fillStyle = '#ffffff'; // White lead
                } else {
                    ctx.fillStyle = color;
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const loop = (timestamp: number) => {
            if (paused.current) {
                // Keep the loop alive but skip rendering
                rafId = requestAnimationFrame(loop);
                return;
            }

            // Throttle to respect the speed prop (e.g. 50ms = ~20 FPS)
            if (timestamp - lastFrameTime >= speed) {
                lastFrameTime = timestamp;
                draw();
            }

            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);

        // Pause rendering when tab is not visible to save CPU
        const handleVisibilityChange = () => {
            if (document.hidden) {
                paused.current = true;
                // Cancel RAF entirely when tab is hidden — browser throttles it anyway
                if (rafId !== null) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            } else {
                paused.current = false;
                lastFrameTime = 0; // Reset to draw immediately on resume
                if (rafId === null) {
                    rafId = requestAnimationFrame(loop);
                }
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Debounced resize handler
        let resizeTimer: ReturnType<typeof setTimeout> | null = null;
        const handleResize = () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setCanvasSize();
                columns = canvas.width / fontSize;
                const newDrops = [];
                for (let x = 0; x < columns; x++) {
                    newDrops[x] = drops[x] || Math.random() * -100;
                }
                drops = newDrops;
            }, 150);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            if (resizeTimer) clearTimeout(resizeTimer);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [speed, color]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity, willChange: 'transform' }}
            aria-hidden="true"
        />
    );
};
