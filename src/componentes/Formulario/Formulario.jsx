import React from 'react'
import { useState, useEffect } from 'react';
import { Iegresos } from '../../modelos/Iegresos';
import { Egresos } from '../Egresos/Egresos';
import { Ingresos } from '../Ingresos/Ingresos';
import { IElistas } from '../IElistas/IElistas';
import styles from './Formulario.module.css';

export const Formulario = () => {

  const [descripcion, setDescripcion] = useState('');
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState(false);

  const [listaE, setListaE] = useState([]);
  const [listaI, setListaI] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoIEgreso = new Iegresos(descripcion, Number(valor), tipo);
    if(nuevoIEgreso.tipo === false){
      setListaE([...listaE, nuevoIEgreso]);
    }else{
      setListaI([...listaI, nuevoIEgreso]);
    }
    //console.log(nuevoIEgreso);

    setDescripcion('');
    setValor(0);
    setTipo(false);

  }
  /*useEffect(() => {
    if(lista.length === 0) {
      console.log('La lista está vacía.');
    }else{
      lista.forEach((item, index) => {
      console.log(`Elemento ${index}:`, item);
      });
    }
    
  }, [lista]);*/

  const EliminarE = (index) => {
    const nuevaLista = listaE.filter((_, i) => i !== index);
    setListaE(nuevaLista);
  }
  const EliminarI = (index) => {
    const nuevaLista = listaI.filter((_, i) => i !== index);
    setListaI(nuevaLista);
  }
  const ActualizarI = (index, descripcion, valor) =>{
    const nuevaLista = listaI.map((ingreso, i) => i === index ?
      new Iegresos(descripcion, Number(valor), true) : ingreso);
    setListaI(nuevaLista);
  }
  const ActualizarE = (index, descripcion, valor) =>{
    const nuevaLista = listaE.map((egreso, i) => i === index ?
      new Iegresos(descripcion, Number(valor), false) : egreso);
    setListaE(nuevaLista);
  }
  return (
    <div className={styles.dashboardContenedor}>
      <h1 className={styles.titulo}>CONTROL DE GASTOS</h1>
      <IElistas listaI={listaI} listaE={listaE}></IElistas>
      <div>
        <form onSubmit={handleSubmit} className={styles.formulario}>
         <h2 className={styles.subtitulo}> REGISTRAR <strong className={styles.ingreso}>INGRESOS</strong> O <strong className={styles.egreso}>EGRESOS</strong></h2>
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Valor"
            value={valor}
            onChange={(e) => {
              const inp = e.target.value;
              if (inp === '' || /^(0|[1-9]\d*)$/.test(inp)) {
                setValor(inp);
              }
            }}
            required
            className={styles.input}
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value === 'true')}
            className={styles.select}
          >
            <option value="false">Egreso</option>
            <option value="true">Ingreso</option>
          </select>
          <button type="submit" className={styles.boton}>
            Agregar
          </button>
        </form>
      </div>
      <div className={styles.listaContenedor}>
        <Egresos lista={listaE} EliminarE={EliminarE} ActualizarE={ActualizarE}/>
        <Ingresos lista={listaI} EliminarI={EliminarI} ActualizarI={ActualizarI}/>
      </div>
    </div>
  )
}
