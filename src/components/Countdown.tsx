import { useContext } from 'react';
import { CountdownContext, CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown () {

    const { 
        seconds,
        minutes,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown
     } = useContext(CountdownContext);


    let [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    let [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    
    return (
            <div>
                <div className={styles.countdownContainer}>
                    <div>
                        <span>{minuteLeft}</span>
                        <span>{minuteRight}</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>{secondLeft}</span>
                        <span>{secondRight}</span>
                    </div>
                </div>
                {hasFinished ? 
                    (
                        <button 
                            disabled
                            type="button" 
                            className={styles.countdownButton}
                        >
                                Ciclo encerrado
                        </button>
                    ) : 
                    (
                        <>
                            { isActive ? (
                                <button 
                                    type="button" 
                                    className={`${styles.countdownButton} ${styles.activeCountdownButton}`}
                                    onClick={resetCountdown}
                                >
                                    Abandonar ciclo
                                </button>
                            ) : (
                                <button 
                                    type="button" 
                                    className={styles.countdownButton}
                                    onClick={startCountdown}
                                >
                                    Iniciar um ciclo
                                </button>
                            )}
                        </>
                    )
                }
            </div>
    );
};
