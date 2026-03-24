import React from 'react';
import BackButton from './BackButton';

const Contacto = ({ alVolver }) => {
  return (
    <div className="contenedor">
      {/* Botón para volver */}
      <div style={{position: 'absolute', top: '20px', left: '20px'}}>
        <BackButton alVolver={alVolver} />
      </div>
      
      <div className="contenedorb">
        <h1 className="titulo-mision">
          <i className="fa-solid fa-heart icono-mision"></i> Contacto
        </h1>
        
        <p className="texto-mision" style={{ textAlign: 'center' }}>¿Tienes dudas? Escríbenos</p>
        
        <form action="/action_page.php">
          <label htmlFor="nombrec">Nombre:</label>
          <input type="text" id="nombrec" name="nombrec" />
          
          <label htmlFor="correo">Correo electrónico:</label>
          <input type="text" id="correo" name="correo" />
          
          <label htmlFor="telefono">Teléfono:</label>
          <input type="tel" id="telefono" name="telefono" />
          
          {/* Botón corregido con el estilo de React */}
          <button 
            type="submit" 
            className="btn-verde" 
            style={{ margin: '20px auto 20px auto', display: 'block', width: 'auto', cursor: 'pointer', fontSize: '16px' }}
          >
            ENVIAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacto;