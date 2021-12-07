import {useState} from 'react';

export default function useMovement(initialXCoord, initialDirection) {
    const [isListening, setIsListening] = useState(false);
    const [xCoord, setXCoord] = useState(initialXCoord);
    const [direction, setDirection] = useState(initialDirection);


    function onKeyUp() {

    }

    function onKeyDown(e) {
        if(e.repeat) {
            return;
        }
        switch(e.key) {
            case 'ArrowRight':
                setXCoord(xCoord + 1);
                if(direction !== 1) {
                    setDirection(1);
                }
                break;
            case 'ArrowLeft':
                setXCoord(xCoord - 1);
                if(direction !== -1) {
                    setDirection(-1);
                }
                break;
        }
        
    }
    
    return {
        xCoord,
        direction,
        onKeyUp,
        onKeyDown
    }
}