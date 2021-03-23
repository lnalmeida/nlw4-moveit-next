import React, { useState, createContext, ReactNode, useContext, useEffect } from 'react';
import challenges from '../../challenges.json';
import { CountdownContext } from './CountdownContext';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData {
    activeChallenge: Challenge;
    experiencetoNextLevel: number;
    level: number;
    levelUp: () => void; 
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
};

interface challengesProviderProps {
    children: ReactNode;
    level : number;
    currentExperience: number; 
    challengesCompleteds: number;
};


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...rest }: challengesProviderProps) {
    const { resetCountdown } = useContext(CountdownContext);

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExoerience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleteds, setChallengesCompleteds] = useState(rest.challengesCompleteds ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLeveUpModalOpen, setIsLeveUpModalOpen] = useState(false);

    const experiencetoNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleteds', String(challengesCompleteds));
    }, [level, currentExperience, challengesCompleteds]);
  
    function levelUp() {
      setLevel(level + 1);
      setIsLeveUpModalOpen(true);
    };

    function closeLevelUpModal() {
        setIsLeveUpModalOpen(false);
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
                closeLevelUpModal
            }}
        >
            {children}

            {isLeveUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
};

