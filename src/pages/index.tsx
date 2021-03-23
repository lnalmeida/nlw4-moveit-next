import  Head  from 'next/head';
import React from 'react';
import { GetServerSideProps } from 'next';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
    level: number;
    currentExperience: number;
    challengesCompleteds: number;
};

export default function Home(props: HomeProps) {
    return (
        <ChallengesProvider 
            level={props.level}
            currentExperience={props.currentExperience}
            challengesCompleteds={props.challengesCompleteds}    
        >
            <div className={styles.mainContainer}>
                <Head>
                    <title> Início - moveIt </title>
                </Head>
                
                <ExperienceBar />

                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenges />
                            <Countdown />
                        </div>

                        <div>
                            <ChallengeBox />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    );
  };     

  export const getServerSideProps: GetServerSideProps = async (ctx) => {
      
      const { level, currentExperience, challengesCompleteds} = ctx.req.cookies;

      return {
          props: { 
              level: Number(level),
              currentExperience: Number(currentExperience),
              challengesCompleteds: Number(challengesCompleteds) 
          }
      };
  };