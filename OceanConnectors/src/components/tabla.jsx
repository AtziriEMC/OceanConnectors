import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

const Tabla = ({ alVolver, titulo, storageKey }) => {
  
  // 1. Cargamos TODO (cantidades y bloqueo) directamente aquí para evitar el useEffect
  const [cantidades, setCantidades] = useState(() => {
    const datosGuardados = localStorage.getItem(storageKey);
    return datosGuardados ? JSON.parse(datosGuardados) : {
      metales: 0, vidrios: 0, plasticoDuro: 0, plasticoUnUso: 0,
      madera: 0, microplasticos: 0, colillas: 0, otros: 0
    };
  });

  const [estaBloqueado, setEstaBloqueado] = useState(() => !!localStorage.getItem(storageKey));

  // 2. Este useEffect solo servirá para RESETEAR si cambias de estación 
  // (por ejemplo de Estación 1 a Estación 2)
  useEffect(() => {
    const datosGuardados = localStorage.getItem(storageKey);
    if (datosGuardados) {
      setCantidades(JSON.parse(datosGuardados));
      setEstaBloqueado(true);
    } else {
      setCantidades({
        metales: 0, vidrios: 0, plasticoDuro: 0, plasticoUnUso: 0,
        madera: 0, microplasticos: 0, colillas: 0, otros: 0
      });
      setEstaBloqueado(false);
    }
  }, [storageKey]); // Se dispara solo cuando cambias de estación

  const modificarCantidad = (material, operacion) => {
    if (estaBloqueado) return;
    setCantidades(prev => ({
      ...prev,
      [material]: operacion === 'mas' ? prev[material] + 1 : Math.max(0, prev[material] - 1)
    }));
  };

  const handleGuardar = () => {
    localStorage.setItem(storageKey, JSON.stringify(cantidades));
    setEstaBloqueado(true);
  };

  const handleEditar = () => setEstaBloqueado(false);

  const listaMateriales = [
    { id: 'metales', nombre: 'Metales', img: 'metal.png' },
    { id: 'vidrios', nombre: 'Vidrios', img: 'vid.png' },
    { id: 'plasticoDuro', nombre: 'Plástico duro', img: 'plasticoduro.png' },
    { id: 'plasticoUnUso', nombre: 'Plástico de un solo uso', img: 'plastico1uso.png' },
    { id: 'madera', nombre: 'Madera procesada', img: 'mad.png' },
    { id: 'microplasticos', nombre: 'Microplásticos', img: 'microplasticos.png' },
    { id: 'colillas', nombre: 'Colillas de cigarro', img: 'cigarro.png' },
    { id: 'otros', nombre: 'Otros (como tetrapak)', img: 'tetra.png' },
  ];

  return (
    <div className="contenedor">
      <div style={{position: 'absolute', top: '20px', left: '20px'}}>
        <BackButton alVolver={alVolver} />
      </div>

      <div className="contenedorb">
        {/* Usamos el título que viene por prop */}
        <h1 className="titulo-mision">{titulo}</h1> 
        <div className="linea-mision"></div>

        <table className="tabla-registros">
          <thead>
            <tr>
              <th></th>
              <th>DESECHOS</th>
              <th>CANTIDAD</th>
            </tr>
          </thead>
          <tbody>
            {listaMateriales.map((item) => (
              <tr key={item.id}>
                <td className="icono-tabla">
                  <img src={`/materiales/${item.img}`} alt={item.nombre} width="40" />
                </td>
                <td className="nombre-material">{item.nombre}</td>
                <td className="controles-cantidad">
                  <button 
                    className="btn-menos" 
                    onClick={() => modificarCantidad(item.id, 'menos')}
                    disabled={estaBloqueado}
                    style={{opacity: estaBloqueado ? 0.5 : 1}}
                  > − </button>
                  <span className="numero-cantidad">{cantidades[item.id]}</span>
                  <button 
                    className="btn-mas" 
                    onClick={() => modificarCantidad(item.id, 'mas')}
                    disabled={estaBloqueado}
                    style={{opacity: estaBloqueado ? 0.5 : 1}}
                  > + </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!estaBloqueado ? (
          <button className="btn-verde" onClick={handleGuardar} style={{ margin: '20px auto', display: 'block' }}>
            GUARDAR
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button className="btn-verde" onClick={handleEditar} style={{ margin: '10px auto' }}>
              EDITAR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabla;