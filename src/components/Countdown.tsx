import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown () {
    let countdownTimeout : NodeJS.Timeout;
    
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    let [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    let [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(true);

    };

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    };

    function throwGaunglet() {
        console.log('Desafio lançado');
    };

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {setTime(time -1)}, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
        };
    }, [isActive, time]);
    
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