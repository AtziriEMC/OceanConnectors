import React, { useState } from 'react';
import BackButton from './BackButton';

const Registro = ({ alVolver, alSiguiente }) => {
  // Estado inicial con datos de localStorage si existen
  const hoy = new Date().toISOString().split('T')[0];
  const [datos, setDatos] = useState(() => {
    const guardado = localStorage.getItem('datosRegistro');
    return guardado ? { ...JSON.parse(guardado), fecha: hoy } : {
      fecha: hoy,
      pais: 'mexico',
      localidad: '',
      playa: '',
      escuela: '',
      equipo: ''
    };
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    // Guardamos en localStorage para que el nombre del equipo persista
    localStorage.setItem('datosRegistro', JSON.stringify(datos));
    alSiguiente();
  };

  return (
    <div className="contenedor">
      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <BackButton alVolver={alVolver} />
      </div>
      
      <div className="contenedorb">
        <h1 className="titulo-mision">Registro</h1>
        <div className="linea-mision"></div>

        <form onSubmit={manejarEnvio}>
          <label htmlFor="fecha">
            <i className="fa-solid fa-calendar-days" style={{color: '#8fb932'}}></i> Fecha:
          </label>
          <input 
            type="date" 
            id="fecha" 
            name="fecha" 
            value={datos.fecha}
            required
            min={hoy}
            max={hoy}
            readOnly
          />

          <label htmlFor="pais">
            <i className="fa-solid fa-earth-americas" style={{color: '#8fb932'}}></i> País:
          </label>
          <select id="pais" name="pais" value={datos.pais} onChange={manejarCambio} required>
            <option value="mexico">México</option>
            <option value="eua">Estados Unidos</option>
          </select>

          <label htmlFor="localidad">
            <i className="fa-solid fa-map-location-dot" style={{color: '#8fb932'}}></i> Localidad:
          </label>
          <select id="localidad" name="localidad" value={datos.localidad} onChange={manejarCambio} required>
            <option value="">Selecciona una localidad</option>
            <option value="localidad1">Localidad 1</option>
            <option value="localidad2">Localidad 2</option>
          </select>

          <label htmlFor="playa">
            <i className="fa-solid fa-umbrella-beach" style={{color: '#8fb932'}}></i> Nombre de la playa:
          </label>
          <select id="playa" name="playa" value={datos.playa} onChange={manejarCambio} required>
            <option value="">Selecciona una playa</option>
            <option value="playa1">Playa 1</option>
            <option value="playa2">Playa 2</option>
          </select>
 
          <label htmlFor="escuela">
            <i className="fa-solid fa-school" style={{color: '#8fb932'}}></i> Escuela:
          </label>
          <input 
            type="text" 
            id="escuela" 
            name="escuela" 
            placeholder="Nombre de tu escuela"
            value={datos.escuela}
            onChange={manejarCambio}
            required 
          />

          <label htmlFor="equipo">
            <i className="fa-solid fa-users" style={{color: '#8fb932'}}></i> Nombre del equipo:
          </label>
          <input 
            type="text" 
            id="equipo" 
            name="equipo" 
            placeholder="Ej. Los Defensores del Mar"
            value={datos.equipo}
            onChange={manejarCambio}
            required 
          />

          <button 
            type="submit" 
            className="btn-verde" 
            style={{ margin: '20px auto', display: 'block', width: 'auto', fontSize: '16px' }}
          >
            SIGUIENTE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;