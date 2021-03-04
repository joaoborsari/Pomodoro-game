import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallangeBox } from '../components/ChallangeBox';
import { CompletedChallanges } from "../components/CompletedChallanges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css'
import { ChallangesProvider } from '../contexts/ChallangesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}

export default function Home(props: HomeProps) {

  
  return (
    <ChallangesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challangesCompleted={props.challangesCompleted}
    >
      <div className={styles.container} >
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallanges />
              <Countdown />
            </div>
            <div>
              <ChallangeBox />
            </div>
            <div>

            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallangesProvider>
  )
}

// so funciona dentro de pages (proprio do nextjs)
// roda dentro do servidor Node
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    } 
  }
}