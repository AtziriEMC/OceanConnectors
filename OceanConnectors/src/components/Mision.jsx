import React from 'react';
import BackButton from './BackButton';

const Mision = ({ alVolver }) => {
  return (
    /* Este div 'contenedor' es el que crea la tarjeta blanca */
    <div className="contenedor">
      {/* Botón para volver */}
      <div style={{position: 'absolute', top: '20px', left: '20px'}}>
        <BackButton alVolver={alVolver} />
      </div>
      
      <div className="contenedorb">
        <h1 className="titulo-mision"><i className="fa-solid fa-seedling icono-mision"></i>Misión</h1>
        <hr className="linea-mision" />
        <p className="texto-mision">
          Ocean Connectors nació al reconocer que muchas personas en nuestras comunidades 
          no tienen las mismas oportunidades para conocer y explorar su entorno costero.
          <br /><br />
          Soñamos con un mundo donde todos los ecosistemas marinos estén saludables 
          y sean protegidos activamente por comunidades apasionadas, conscientes de su impacto 
          global y empoderadas para generar un cambio.
        </p>
      </div>
    </div>
  );
};

export default Mision;