import React from 'react';
import styles from './Accueil.module.css';
import Date from '../../src/components/Date'
import { useSelector } from 'react-redux';

const Accueil = () => {




    return (
        <div className={styles.box}>
            <div className={styles.dateBox}><Date /></div>
            <div className={styles.infoBox}>
                {/* ----------- Température Air ----------- */}
                <div className={styles.cardInfosBox}>
                    <div className={styles.cardInfosData}>
                        <div className={styles.cardInfosTitle}>{'Température Air'}</div>
                        <div className={styles.cardInfosValeur}>{'18'}{' °C'}</div>
                        <div className={styles.cardInfosConsigne}>{'Consigne : '}{'15'}{' °C'} </div>
                        <div className={styles.cardInfosDelta}>{'Delta : '}{'3'}{' °C'}</div>
                    </div>

                    <div className={styles.cardInfosInput}>
                        <div className={styles.cardInfosInputContainer}>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Consigne'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{'10'}{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBoxButton}>
                                <button className={styles.cardInfosInputValueBoxButton}>Valider</button>
                            </div>
                        </div>

                        <div className={styles.cardInfosInputContainer2}>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Objectif'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{'10'}{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Pas'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{'10'}{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBoxButton}>
                                <button className={styles.cardInfosInputValueBoxButton}>Valider</button>
                            </div>
                        </div>

                        <div className={styles.cardInfosDescenteContainer}>
                            <div className={styles.cardInfosDescenteTitle}>{'Gestion descente'}</div>
                            <div className={styles.cardInfosDescenteData}>{'1 Jour et 4 heures'}</div>
                        </div>
                    </div>
                </div>

                {/* ----------- Température Substrat ----------- */}

                <div className={styles.cardInfosBox}>
                    <div className={styles.cardInfosData}>
                        <div className={styles.cardInfosTitle}>{'Température Substrat'}</div>
                        <div className={styles.cardInfosValeur}>{ }{' °C'}</div>
                        <div className={styles.cardInfosConsigne}>{'Consigne : '}{ }{' °C'} </div>
                        <div className={styles.cardInfosDelta}>{'Delta : '}{ }{' °C'}</div>
                    </div>

                    <div className={styles.cardInfosInput}>
                        <div className={styles.cardInfosInputContainer}>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Consigne'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{ }{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBoxButton}>
                                <button className={styles.cardInfosInputValueBoxButton}>Valider</button>
                            </div>
                        </div>

                        <div className={styles.cardInfosInputContainer2}>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Objectif'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{ }{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Pas'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{ }{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBoxButton}>
                                <button className={styles.cardInfosInputValueBoxButton}>Valider</button>
                            </div>
                        </div>

                        <div className={styles.cardInfosDescenteContainer}>
                            <div className={styles.cardInfosDescenteTitle}>{'Gestion descente'}</div>
                            <div className={styles.cardInfosDescenteData}>{ }</div>
                        </div>
                    </div>
                </div>

                {/* ----------- Taux Humidité ----------- */}
                <div className={styles.cardInfosBox}>
                    <div className={styles.cardInfosData}>
                        <div className={styles.cardInfosTitle}>{'Taux Humidité'}</div>
                        <div className={styles.cardInfosValeur}>{ }{' %'}</div>
                        <div className={styles.temperatureSecHum}>{'Température Sec : '}{ }{' °C'}</div>
                        <div className={styles.temperatureSecHum}>{'Température Hum : '}{ }{' °C'}</div>
                        <div className={styles.cardInfosConsigne}>{'Consigne : '}{ }{' °C'} </div>
                        <div className={styles.cardInfosDelta}>{'Delta : '}{ }{' °C'}</div>
                    </div>
                    <div className={styles.cardInfosInput}>
                        <div className={styles.cardInfosInputContainer}>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Consigne'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{ }{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBoxButton}>
                                <button className={styles.cardInfosInputValueBoxButton}>Valider</button>
                            </div>
                        </div>

                        <div className={styles.cardInfosInputContainer2}>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Objectif'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{ }{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Pas'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{ }{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBoxButton}>
                                <button className={styles.cardInfosInputValueBoxButton}>Valider</button>
                            </div>
                        </div>

                        <div className={styles.cardInfosDescenteContainer}>
                            <div className={styles.cardInfosDescenteTitle}>{'Gestion descente'}</div>
                            <div className={styles.cardInfosDescenteData}>{ }</div>
                        </div>
                    </div>
                </div>


                {/* ----------- Taux Co2 ----------- */}
                <div className={styles.cardInfosBox}>
                    <div className={styles.cardInfosData}>
                        <div className={styles.cardInfosTitle}>{'Taux Co2'}</div>
                        <div className={styles.cardInfosValeur}>{ }{' PPM'}</div>
                        <div className={styles.cardInfosConsigne}>{'Consigne : '}{ }{' °C'} </div>
                        <div className={styles.cardInfosDelta}>{'Delta : '}{ }{' °C'}</div>
                    </div>
                    <div className={styles.cardInfosInput}>
                        <div className={styles.cardInfosInputContainer}>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Consigne'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{ }{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBoxButton}>
                                <button className={styles.cardInfosInputValueBoxButton}>Valider</button>
                            </div>
                        </div>

                        <div className={styles.cardInfosInputContainer2}>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Objectif'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{ }{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBox}>
                                <div className={styles.cardInfosInputValueBoxTitle}>{'Pas'}</div>
                                <input className={styles.cardInfosInputValueInput} />
                                <div className={styles.cardInfosInputValueHisto}>{ }{'°C'}</div>
                            </div>
                            <div className={styles.cardInfosInputBoxButton}>
                                <button className={styles.cardInfosInputValueBoxButton}>Valider</button>
                            </div>
                        </div>

                        <div className={styles.cardInfosDescenteContainer}>
                            <div className={styles.cardInfosDescenteTitle}>{'Gestion descente'}</div>
                            <div className={styles.cardInfosDescenteData}>{ }</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Accueil;