import React, { useState, useEffect, } from 'react';
import Styles from './Menu.module.css'
import { useDispatch } from 'react-redux';
import { clicOnMenu } from '../../src/Redux/Actions/clicOnMenu.action'


const Menu = () => {
    const dispatch = useDispatch();

    const [clickOnAccueil, setClickOnAccueil] = useState('')
    const [clickOnEauAuSol, setClickOnEauAuSoll] = useState('')
    const [clickOnCourbes, setClickOnCourbes] = useState('')

    useEffect(() => {
        setClickOnAccueil(true)
    }, []);

    let handleClicAccueil = () => {
        // console.log('handleClicAccueil');
        dispatch(clicOnMenu('clickOnAccueil'))
        setClickOnAccueil(true)
        setClickOnEauAuSoll(false)
        setClickOnCourbes(false)

    }

    let handleClicEauAuSol = () => {
        // console.log('handleClicEauAuSol');
        dispatch(clicOnMenu('clickOnEauAuSol'))
        setClickOnAccueil(false)
        setClickOnEauAuSoll(true)
        setClickOnCourbes(false)
    }

    let handleClicCourbes = () => {
        // console.log('clickOnCourbes');
        dispatch(clicOnMenu('clickOnCourbes'))
        setClickOnAccueil(false)
        setClickOnEauAuSoll(false)
        setClickOnCourbes(true)
    }


    return (
        <div className={Styles.box}>
            <div className={Styles.boxTitle}>MENU</div>
            <div className={Styles.boxMenu}>
                <button className={(!clickOnAccueil ? Styles.boxMenuButtonsOn : Styles.boxMenuButtonsOff)} onClick={handleClicAccueil}>Accueil</button>
                <button className={(!clickOnEauAuSol ? Styles.boxMenuButtonsOn : Styles.boxMenuButtonsOff)} onClick={handleClicEauAuSol}>Relay</button>
                <button className={(!clickOnCourbes ? Styles.boxMenuButtonsOn : Styles.boxMenuButtonsOff)} onClick={handleClicCourbes}>Courbes</button>
            </div>
        </div>
    );
};

export default Menu;