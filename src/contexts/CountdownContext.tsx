import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
    seconds: number;
    minutes: number;
    isActive: boolean;
    hasFinished: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
};

interface countdownProviderProps {
    children: ReactNode;
};

export const CountdownContext = createContext({} as CountdownContextData);



export function CountdownProvider({ children }: countdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    let countdownTimeout : NodeJS.Timeout

    const [time, setTime] = useState(1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    };
    
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(1 * 60);
    };

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {setTime(time -1)}, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        };
    }, [isActive, time]);

    return (
        <CountdownContext.Provider 
            value={{
                seconds,
                minutes,
                isActive,
                hasFinished,
                startCountdown,
                resetCountdown
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
};
