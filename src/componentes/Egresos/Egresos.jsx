import React from 'react'
import styles from '../Formulario/Formulario.module.css';

export const Egresos = ({lista, EliminarE}) => {
  
  if (!Array.isArray(lista)) {
    return <p>Error: Lista inválida.</p>;
  }
  
  return (
    <div className={styles.tarjeta}>
      <h3>Egresos</h3>
      {lista.length === 0 ? (
        <p>No hay <strong>egresos</strong> registrados.</p>
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
            {lista.map((egreso, index) => (
              <tr key={index}>
                <td>{egreso.descripcion}</td>
                <td>${egreso.valor}</td>
                <td>
                  <button className={styles.botonEliminar} onClick={() => EliminarE(index)}> Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
