import React from 'react'
import styles from './IElistas.module.css'

export const IElistas = ({listaI, listaE}) => {

  if(!Array.isArray(listaI) || !Array.isArray(listaE)){
    return <p>Error: Lista inválida.</p>;
  }
  const totalIngresos = listaI.reduce((total, ingreso) => total + ingreso.valor, 0);
  const totalEgresos = listaE.reduce((total, egreso) => total + egreso.valor, 0); 
  const total = totalIngresos - totalEgresos;
  return (
    <div className={styles.resumenContainer}>
      <div className={styles.resumenTotales}>
        <div className={styles.cuadroIngreso}>
          <h4>INGRESOS ${totalIngresos.toLocaleString()}</h4>
        </div>
        <div className={styles.cuadroEgreso}>
          <h4>EGRESOS ${totalEgresos.toLocaleString()}</h4>
        </div>
      </div>
      <div
        className={`${styles.saldo} ${
          total < 0 ? styles.saldoNegativo : styles.saldoPositivo
        }`}
      >
        <h4>SALDO ${total.toLocaleString()}</h4>
        <p></p>
      </div>
    </div>
  )
}
