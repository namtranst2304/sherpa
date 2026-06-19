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

        const interval = setInterval(draw, speed);

        const handleResize = () => {
            setCanvasSize();
            columns = canvas.width / fontSize;
            const newDrops = [];
            for (let x = 0; x < columns; x++) {
                newDrops[x] = drops[x] || Math.random() * -100;
            }
            drops = newDrops;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, [speed, color]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity }}
            aria-hidden="true"
        />
    );
};
