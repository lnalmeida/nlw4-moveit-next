import { useState, createContext, ReactNode, useContext, useEffect } from 'react';
import challenges from '../../challenges.json';
import { CountdownContext } from './CountdownContext';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData {
    level : number;
    currentExperience: number; 
    challengesCompleteds: number;
    activeChallenge: Challenge;
    experiencetoNextLevel: number;
    levelUp: () => void; 
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
};

interface challengesProviderProps {
    children: ReactNode;
};


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children}: challengesProviderProps) {
    const { resetCountdown } = useContext(CountdownContext);

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExoerience] = useState(0);
    const [challengesCompleteds, setChallengesCompleteds] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experiencetoNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);
  
    function levelUp() {
      setLevel(level + 1);
    };

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio \u{1F3C6}!', {body: `Valendo ${challenge.amount} xp!`});
        };

        new Audio('/notification.mp3').play();
    };

    function resetChallenge() {
        setActiveChallenge(null);
    };

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        };
        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        
        if (finalExperience >= experiencetoNextLevel) {
            levelUp();
            finalExperience = finalExperience - experiencetoNextLevel;
        };
        
        setActiveChallenge(null);
        setCurrentExoerience(finalExperience);
        setChallengesCompleteds(challengesCompleteds + 1);        
    }

    return (
        <ChallengesContext.Provider 
            value = {{
                level, 
                currentExperience, 
                challengesCompleteds, 
                activeChallenge, 
                experiencetoNextLevel,
                levelUp, 
                startNewChallenge,
                resetChallenge,
                completeChallenge,
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
};

