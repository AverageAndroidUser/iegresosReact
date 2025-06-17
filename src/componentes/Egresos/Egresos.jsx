import React, { useState } from 'react'
import styles from '../Formulario/Formulario.module.css';

export const Egresos = ({lista, EliminarE, ActualizarE}) => {
  
  if (!Array.isArray(lista)) {
    return <p>Error: Lista inválida.</p>;
  }

  const [modoEditar, setModoEditar] = useState(null);
  const [nuevoDescripcion, setNuevoDescripcion] = useState('');
  const [nuevoValor, setNuevoValor] = useState(0);

  const guardarCambios = (index) => {
    if (nuevoDescripcion.trim() === "" || nuevoValor <= 0) return;
    ActualizarE(index, nuevoDescripcion, nuevoValor);
    setModoEditar(null);
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              lista.map((egreso, index) => (
                <tr key={index}>
                  {
                    modoEditar === index ? (
                        <>
                          <td>
                            <input required className={styles.inputEditar} value={nuevoDescripcion} onChange={(e) => setNuevoDescripcion(e.target.value)}/>
                            <input required className={styles.inputEditar} value={nuevoValor} onChange={(e) => {
                                const inp = e.target.value;
                                if (inp === '' || /^(0|[1-9]\d*)$/.test(inp)) {
                                  setNuevoValor(inp);
                                }
                              }
                              }
                            />
                          </td>
                          <td>${egreso.valor.toLocaleString()}</td>
                          <td>
                            <div className={styles.botonesVerticales}>
                              <button className={styles.botonEliminar} onClick={() => EliminarE(index)}>Eliminar</button>
                              <button className={styles.botonGuardar} onClick={() => guardarCambios(index)}>Guardar</button>
                            </div>
                          </td>
                        </>
                    ):(
                      <>
                        <td>{egreso.descripcion}</td>
                        <td>${egreso.valor.toLocaleString()}</td>
                          <td>
                            <div className={styles.botonesCentrados}>
                              <button className={styles.botonEliminar} onClick={() => EliminarE(index)}>Eliminar</button>
                              <button className={styles.botonEditar} onClick={() => {
                                setModoEditar(index);
                                setNuevoDescripcion(egreso.descripcion);
                                setNuevoValor(egreso.valor);
                              }}>Editar</button>
                            </div>
                          </td>
                      </>
                    )
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
    </div>
  )
}
