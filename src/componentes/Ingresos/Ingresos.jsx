import React from 'react'
import styles from '../Formulario/Formulario.module.css';

export const Ingresos = ({lista, EliminarI}) => {

  if(!Array.isArray(lista)){
    return <p>Error: Lista inválida.</p>;
  }

  return (
    <div className={styles.tarjeta}>
      <h3>Egresos</h3>
      {lista.length === 0 ? (
        <p>No hay <strong>ingresos</strong> registrados.</p>
      ) : (
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((ingreso, index) => (
              <tr key={index}>
                <td>{ingreso.descripcion}</td>
                <td>${ingreso.valor}</td>
                <td>
                  <button className={styles.botonEliminar} onClick={() => EliminarI(index)}> Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
