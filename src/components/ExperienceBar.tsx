import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar (): JSX.Element {
    const { currentExperience, experiencetoNextLevel } = useContext(ChallengesContext);

    const percentToNextLevel = Math.round(currentExperience * 100) / experiencetoNextLevel;

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width:`${percentToNextLevel}%`}}/>
                <span className={styles.currentExperience} style={{left:`${percentToNextLevel}%`}}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experiencetoNextLevel} xp</span>
        </header>
    );
};