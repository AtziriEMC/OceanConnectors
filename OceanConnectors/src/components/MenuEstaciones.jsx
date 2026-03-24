import React, { useState } from 'react'; // Quitamos useEffect porque ya no se usa
import BackButton from './BackButton';

const MenuEstaciones = ({ alVolver, alEstacion1, alEstacion2, alEstacion3, alFinalizar }) => {
  // Inicializamos el estado directamente desde localStorage
  // Esto evita el error de "cascading renders"
  const [completadas] = useState(() => {
    return {
      estacion1: !!localStorage.getItem('datosEstacion1'),
      estacion2: !!localStorage.getItem('datosEstacion2'),
      estacion3: !!localStorage.getItem('datosEstacion3')
    };
  });

  const todasCompletas = completadas.estacion1 && completadas.estacion2 && completadas.estacion3;

  return (
    <div className="contenedor">
      <div style={{position: 'absolute', top: '20px', left: '20px'}}>
        <BackButton alVolver={alVolver} />
      </div>
      <div className="contenedorb">
        <h1 className="titulo-mision">Menú de Estaciones</h1>
        <div className="linea-mision"></div>
        
        <button
          className={completadas.estacion1 ? 'btn-verde' : 'btn-rojo'}
          onClick={alEstacion1}
          style={{ margin: '20px auto 10px auto', display: 'block', width: 'auto', cursor: 'pointer', fontSize: '16px' }}
        >
          Estación 1
        </button>

        <button
          className={completadas.estacion2 ? 'btn-verde' : 'btn-rojo'}
          onClick={alEstacion2}
          style={{ margin: '10px auto 10px auto', display: 'block', width: 'auto', cursor: 'pointer', fontSize: '16px' }}
        >
          Estación 2
        </button>

        <button
          className={completadas.estacion3 ? 'btn-verde' : 'btn-rojo'}
          onClick={alEstacion3}
          style={{ margin: '10px auto 20px auto', display: 'block', width: 'auto', cursor: 'pointer', fontSize: '16px' }}
        >
          Estación 3
        </button>

        <button
          className="btn-verde"
          onClick={() => {
            // Borra todos los datos de las estaciones y del registro
            localStorage.removeItem('datosEstacion1');
            localStorage.removeItem('datosEstacion2');
            localStorage.removeItem('datosEstacion3');
            localStorage.removeItem('datosRegistro');
            if (typeof alFinalizar === 'function') alFinalizar();
          }}
          style={{ 
            margin: '30px auto 0 auto', 
            display: 'block', 
            width: 'auto', 
            fontSize: '18px', 
            opacity: todasCompletas ? 1 : 0.5, 
            pointerEvents: todasCompletas ? 'auto' : 'none' 
          }}
          disabled={!todasCompletas}
        >
          FINALIZAR
        </button>
      </div>
    </div>
  );
};

export default MenuEstaciones;