import React, { useEffect, useState } from 'react';
import Styles from './Courbes.module.css'
import CourbesBoxAir from './CourbesBoxAir';
import CourbesBoxSubstrat from './CourbesBoxSubstrat';
import CourbesBoxHumidite from './CourbesBoxHumidite';
import CourbesBoxCo2 from './CourbesBoxCo2';


const Courbes = () => {
    const [courbesBoxAirModal, setCourbesBoxAirModal] = useState('');
    const [courbesBoxSubstratModal, setCourbesBoxSubstratModal] = useState('');
    const [courbesBoxHumiditeModal, setCourbesBoxHumiditeModal] = useState('');
    const [courbesBoxCo2Modal, setCourbesBoxCo2Modal] = useState('');

    useEffect(() => {
        setCourbesBoxAirModal(true);
    }, []);


    const handleModals = (e) => {
        e.preventDefault();

        if (e.target.id === 'gestionAir') {
            setCourbesBoxAirModal(true);
            setCourbesBoxSubstratModal(false);
            setCourbesBoxHumiditeModal(false);
            setCourbesBoxCo2Modal(false);

        } else if (e.target.id === 'gestionSub') {
            setCourbesBoxAirModal(false);
            setCourbesBoxSubstratModal(true);
            setCourbesBoxHumiditeModal(false);
            setCourbesBoxCo2Modal(false);
        } else if (e.target.id === 'gestionHum') {
            setCourbesBoxAirModal(false);
            setCourbesBoxSubstratModal(false);
            setCourbesBoxHumiditeModal(true);
            setCourbesBoxCo2Modal(false);
        } else if (e.target.id === 'gestionCo2') {
            setCourbesBoxAirModal(false);
            setCourbesBoxSubstratModal(false);
            setCourbesBoxHumiditeModal(false);
            setCourbesBoxCo2Modal(true);
        }

    };

    return (
        <div className={Styles.box}>
            <div className={Styles.boxTab}>
                <div className={(!courbesBoxAirModal ? Styles.tabOn : Styles.tabOff)} onClick={handleModals}
                    id="gestionAir">Gestion Air</div>
                <div className={(!courbesBoxSubstratModal ? Styles.tabOn : Styles.tabOff)} onClick={handleModals}
                    id="gestionSub">Gestion Substrat</div>
                <div className={(!courbesBoxHumiditeModal ? Styles.tabOn : Styles.tabOff)} onClick={handleModals}
                    id="gestionHum">Gestion Humidité</div>
                <div className={(!courbesBoxCo2Modal ? Styles.tabOn : Styles.tabOff)} onClick={handleModals}
                    id="gestionCo2">Gestion Co2</div>
            </div>
            <div className={Styles.boxBody}>
                {courbesBoxAirModal && <CourbesBoxAir />}
                {courbesBoxSubstratModal && <CourbesBoxSubstrat />}
                {courbesBoxHumiditeModal && <CourbesBoxHumidite />}
                {courbesBoxCo2Modal && <CourbesBoxCo2 />}
            </div>
        </div>
    );
};

export default Courbes;