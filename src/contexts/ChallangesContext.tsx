import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challanges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallangesProviderProps {
  children: ReactNode; // ReactNode aceita qualquer elemento como filho, até componentes
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}

interface Challange {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallangesContextData {
  level: number; 
  currentExperience: number; 
  challangesCompleted: number;
  activeChallange: Challange; //pode usar object, mas melhor assim
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallange: () => void;
  resetChallange: () => void;
  completeChallange: () => void;
  closeLevelUpModal: () => void;
}

export const ChallangesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({ children, ...rest } : ChallangesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challangesCompleted, setChallangesCompleted] = useState(rest.challangesCompleted ?? 0);
  const [activeChallange, setActiveChallange] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challangesCompleted', String(challangesCompleted));
  } , [level, currentExperience, challangesCompleted]);
  
  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallange() {
    const ramdomChallangeIndex = Math.floor(Math.random() * challanges.length)
    const challange = challanges[ramdomChallangeIndex];

    setActiveChallange(challange)

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🥳', {
        body: `Valendo ${challange.amount} xp!`
      })
    }
  }
  
  function resetChallange() {
    setActiveChallange(null);
  }

  function completeChallange() {
    if (!activeChallange) {
      return;
    }

    const { amount } = activeChallange;
    console.log(currentExperience)
    console.log(amount)
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallange(null);
    setChallangesCompleted(challangesCompleted + 1);
  }

  return(
    // provider permite tudo o que esta dentro ter acesso as informacoes do context
    <ChallangesContext.Provider 
      value={{ 
        level, 
        levelUp, 
        currentExperience, 
        challangesCompleted,
        startNewChallange,
        activeChallange,
        resetChallange,
        experienceToNextLevel,
        completeChallange,
        closeLevelUpModal,
      }} 
    >
      { children }

      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallangesContext.Provider>
  );
}