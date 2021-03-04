import { useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/Profile.module.css'

export const Profile = () => {
  const { level } = useContext(ChallangesContext);
  
  return(
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/68501945?s=460&u=e1a3e7acc8f20e4c04d59ec1cb5bdbdd0dab46ce&v=4" alt="Joao"/>
      <div>
        <strong>Joao Borsari</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level { level }
        </p>
      </div>
    </div>
  );
}