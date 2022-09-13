import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import Accueil from '../src/components/Accueil';
import GestionRelay from '../src/components/GestionRelay';
import Courbes from '../src/components/Courbes';



export default function Home() {

  //! Gestion du state du bouton menu cliqué.

  const clickedButton = useSelector((state) => state.clicOnMenu);
  //console.log('⭐ Accueil ===> Bouton cliqué :', clickedButton);

  //! -----------------------------------------------

  const [accueilModal, setAccueilModal] = useState('');
  const [gestionRelayModal, setGestionRelayModal] = useState('');
  const [courbesModal, setCourbesModal] = useState('');

  useEffect(() => {
    setAccueilModal(true);
  }, []);

  useEffect(() => {
    if (clickedButton === 'clickOnAccueil') {
      // console.log('Clic sur : clickOnAccueil');

      setAccueilModal(true)
      setGestionRelayModal(false)
      setCourbesModal(false)

    } else if (clickedButton === 'clickOnEauAuSol') {
      // console.log('Clic sur : clickOnEauAuSol');

      setAccueilModal(false)
      setGestionRelayModal(true)
      setCourbesModal(false)

    } else if (clickedButton === 'clickOnCourbes') {
      // console.log('Clic sur : clickOnCourbes');

      setAccueilModal(false)
      setGestionRelayModal(false)
      setCourbesModal(true)

    }

  }, [clickedButton])

  return (
    <div className={styles.box}>
      {accueilModal && <Accueil />}
      {gestionRelayModal && <GestionRelay />}
      {courbesModal && <Courbes />}

    </div>
  )
}
