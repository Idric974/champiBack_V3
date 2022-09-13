/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import Styles from './Date.module.css'


const date = () => {

    const [clockState, setclockState] = useState(' ')

    useEffect(() => {

        setInterval(() => {
            const date = new Date();
            setclockState(date.toLocaleTimeString());
            // console.log("L'heure : ", clockState);
        }, 1000);
    })

    return (
        <div className={Styles.box}>
            {clockState}
        </div>
    );
};

export default date;