import React, { useState, useEffect, } from 'react';
import Styles from './GestionRelay.module.css'
import { useDispatch } from 'react-redux';
import { eauAuSol } from '../Redux/Actions/relays.action';

const GestionRelay = () => {
    const dispatch = useDispatch();

    const clickOnEauAuSol = () => {
        console.log('clis sur le bouton eau au sol');
        dispatch(eauAuSol('ActivationEauAuSol'))
    }



    return (

        <div className={Styles.box}>

            <div className={Styles.container}>

                {/* ---------- Eau au sol ---------- */}
                <div className={Styles.boxData}>
                    <div className={Styles.divTitle}>Eau au sol</div>
                    <button className={Styles.boxDataButtonOn} onClick={clickOnEauAuSol}>Activation</button>
                </div>

                {/* ---------- Ventilateur humidité ---------- */}
                <div className={Styles.boxData}>
                    <div className={Styles.divTitle}>Ventilateur humidité</div>
                    <button className={Styles.boxDataButtonOn}>Activation</button>
                    <button className={Styles.boxDataButtonOff}>Déactivation</button>
                </div>

                {/* ---------- Etat Vanne froid ---------- */}
                <div className={Styles.boxDataDouble}>
                    <div className={Styles.divTitle}>{'Etat Vanne froid à : '}{'100%'}</div>
                    <div className={Styles.boxContainer}>
                        <div className={Styles.boxContainerData}>

                            <div className={Styles.divTitle2}>Action à 5 secondes</div>
                            <button className={Styles.boxDataButtonOn}>Ouverture</button>
                            <button className={Styles.boxDataButtonOff}>Fermeture</button>
                        </div>
                        <div className={Styles.boxContainerData}>
                            <div className={Styles.divTitle2}>Action à 40 secondes</div>
                            <button className={Styles.boxDataButtonOn}>Ouverture</button>
                            <button className={Styles.boxDataButtonOff}>Fermeture</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GestionRelay;