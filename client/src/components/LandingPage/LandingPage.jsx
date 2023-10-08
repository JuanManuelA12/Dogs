import React from "react";
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'
import imagenPerro from "../../Image/imagenPerro.jpg"

export default function LandingPage(){
    return(
            <div className={styles.hero}>
                <h1 className={styles.title}>Bienvenidos al Mundo Canino</h1>
                <img src= {imagenPerro} alt="Imagen perruna"/>
                <Link to='/buscar'>
                    <button className={styles.bubblyButton}>Conoce más sobre nosotros</button>
                </Link>
                
            </div>
    )
}