import { useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallangesContext);
  
  return(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header> { level} </header>

        <strong>Top mlk!</strong>
        <p>Você alcançou um novo level!!!</p>

        <button type='button' onClick={closeLevelUpModal} >
          <img src="/icons/close.svg" alt="Fechal janela"/>
        </button>
      </div>
    </div>
  );
}