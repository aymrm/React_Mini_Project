import React, { useEffect, useRef, useState } from 'react';

export default function CanvasDraw(){
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const isDrawing = useRef(false);
    const pathRef = useRef([]);
    const patterns = useRef([]);
    const [recognizedText, setRecognizedText] = useState('');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            contextRef.current = context;
        }
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        isDrawing.current = true;
    };

    const draw = ({ nativeEvent }) => {
        if (!contextRef.current || !isDrawing.current) return;
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        pathRef.current.push({ x: offsetX, y: offsetY });
    };

    const endDrawing = () => {
        if (contextRef.current) {
            contextRef.current.closePath();
            isDrawing.current = false;
        }
    };

    const recognizeText = () => {
        const drawnPath = pathRef.current;
        const recognized = recognizePath(drawnPath);
        if (recognized) {
            patterns.current.push({ path: drawnPath, text: recognized });
            setRecognizedText(recognized); // Recognized text를 상태에 저장
        }
    };

    const recognizePath = (path) => {
        const matchingPattern = findMatchingPattern(path);
        return matchingPattern ? matchingPattern.text : null;
    };

    const findMatchingPattern = (path) => {
        return patterns.current.find((pattern) => {
            return isPathMatching(pattern.path, path);
        });
    };

    const isPathMatching = (patternPath, drawnPath) => {
        return patternPath.length === drawnPath.length;
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                width={400}
                height={200}
            />
            <br/>
            <button onClick={recognizeText}>Recognize Text</button>
            <div>Recognized Text: {recognizedText}</div>
        </div>
    );
}