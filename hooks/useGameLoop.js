import {useState, useEffect, useRef} from 'react';
import usePrevious from './usePrevious.js';

export default function useGameLoop(initalPosition, initialDirection) {
    const [isRunning, setIsRunning] = useState(true);
    const [position, setPosition] = useState(initalPosition);
    const [direction, setDirection] = useState(initialDirection);
    const [pressedKeys, setPressedKeys] = useState([]);

    const requestRef = useRef();
    //const prevPressedKeys = usePrevious(pressedKeys)

    useEffect(() => {
        requestRef.current = requestAnimationFrame(onLoop);
        return () => cancelAnimationFrame(requestRef.current);
    }, [pressedKeys]);

    function onLoop() {
        if(isRunning) {
            if(pressedKeys.length && isMovementKey(pressedKeys[pressedKeys.length - 1])) {
                move(pressedKeys[pressedKeys.length - 1]);
            }

            requestRef.current = requestAnimationFrame(onLoop);
        }
    }

    function isMovementKey(key) {
        return key === 'ArrowLeft' || key === 'ArrowRight';
    }

    function move(key) {
        const newDirection = key === 'ArrowLeft' ? -1 : 1;
        
        setDirection(newDirection);

        setPosition(prevPosition => getUpdatedPosition(prevPosition, newDirection));
    }

    function getUpdatedPosition(prevPosition, direction) {
        let newPosition = direction === -1 ? {
            x: prevPosition.x - 1
        } : {
            x: prevPosition.x + 1
        };

        if(newPosition.x < 0) {
            newPosition.x = 100;
        } else if(newPosition.x > 100) {
            newPosition.x = 0;
        }

        return newPosition;
    }

    function onKeyDown({key}) {
        if(!pressedKeys.includes(key)) {
            setPressedKeys([...pressedKeys, key]);
        }
    }

    function onKeyUp({key}) {
        if(pressedKeys.includes(key)) {
            setPressedKeys(pressedKeys.filter(pressedKey => pressedKey !== key));
        }
    }

    return {
        onKeyDown,
        onKeyUp,
        position,
        direction
    };
}