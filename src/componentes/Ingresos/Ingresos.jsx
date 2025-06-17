import React, { useState } from 'react'
import styles from '../Formulario/Formulario.module.css';

export const Ingresos = ({lista, EliminarI, ActualizarI}) => {

  if(!Array.isArray(lista)){
    return <p>Error: Lista inválida.</p>;
  }

  const [modoEditar, setModoEditar] = useState(null);
  const [nuevoDescripcion, setNuevoDescripcion] = useState('');
  const [nuevoValor, setNuevoValor] = useState(0);
  
  const guardarCambios = (index) => {
    if (nuevoDescripcion.trim() === "" || nuevoValor <= 0) return;
    ActualizarI(index, nuevoDescripcion, nuevoValor);
    setModoEditar(null);
  }

  return (
    <div className={styles.tarjeta}>
      <h3>Ingresos</h3>
      {lista.length === 0 ? (
        <p>No hay <strong>ingresos</strong> registrados.</p>
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
              {lista.map((ingreso, index) => (
                <tr key={index}>
                  {
                    modoEditar === index ? (
                      <>
                        <td>
                          <input required className={styles.inputEditar} value={nuevoDescripcion} onChange={(e) => setNuevoDescripcion(e.target.value)} />
                        </td>
                        <td>
                          <input required className={styles.inputEditar} value={nuevoValor} onChange={(e) => {
                            const inp = e.target.value;
                            if (inp === '' || /^(0|[1-9]\d*)$/.test(inp)) {
                              setNuevoValor(inp);
                            }
                          }
                          } 
                          />
                        </td>
                        <td>
                          <div className={styles.botonesVerticales}>
                            <button className={styles.botonEliminar} onClick={() => EliminarI(index)}> Eliminar</button>
                            <button className={styles.botonGuardar} onClick={() => guardarCambios(index)}> Guardar</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{ingreso.descripcion}</td>
                        <td>${ingreso.valor.toLocaleString()}</td>
                        <div className={styles.botonesCentrados}>
                          <td>
                          <button className={styles.botonEliminar} onClick={() => EliminarI(index)}> Eliminar</button>
                          <button className={styles.botonEditar} onClick={() => {
                            setModoEditar(index), setNuevoDescripcion(ingreso.descripcion), setNuevoValor(ingreso.valor)
                          }}>
                            Editar</button>
                          </td>
                        </div>
                      </>
                    )
                  }
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
