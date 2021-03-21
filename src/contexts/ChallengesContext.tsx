import { useState, createContext, ReactNode } from 'react';

export const ChallengesContext = createContext({});

interface challengesProviderProps {
    children: ReactNode;
}

export function ChallengesProvider({ children}: challengesProviderProps) {
    const [level, setLevel] = useState(1);
  
    function levelUp() {
      setLevel(level + 1);
    };
    
    return (
        <ChallengesContext.Provider value = {{level, levelUp}}>
            {children}
        </ChallengesContext.Provider>
    );
};

