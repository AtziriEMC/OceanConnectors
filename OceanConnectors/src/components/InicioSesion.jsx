import React, { useState } from 'react';
import BackButton from './BackButton';

const InicioSesion = ({ alVolver, alIngresar }) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorContrasena, setErrorContrasena] = useState('');

  const validarCorreo = (valor) => {
    // Verifica solo que tenga formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(valor)) {
      setErrorCorreo('Ingrese un correo válido');
      return false;
    }
    setErrorCorreo('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correoValido = validarCorreo(correo);
    const contrasenaValida = contrasena.length > 7;
    setErrorContrasena(contrasenaValida ? '' : 'Ingrese una contraseña válida');
    if (correoValido && contrasenaValida) {
      if (alIngresar) alIngresar(correo);
    }
  };

  return (
    <div className="contenedor">
      <div style={{position: 'absolute', top: '20px', left: '20px'}}>
        <BackButton alVolver={alVolver} />
      </div>
      <div className="contenedorb">
        <h1 className="titulo-mision">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="correo"><i className="fa-solid fa-envelope" style={{color: '#8fb932'}}></i> Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            onBlur={e => validarCorreo(e.target.value)}
            className={errorCorreo ? 'input-error' : ''}
          />
          {errorCorreo && <div style={{color: 'red', fontSize: '14px'}}>{errorCorreo}</div>}

          <label htmlFor="contrasena"><i className="fa-solid fa-lock" style={{color: '#8fb932'}}></i> Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            className={errorContrasena ? 'input-error' : ''}
          />
          {errorContrasena && <div style={{color: 'red', fontSize: '14px'}}>{errorContrasena}</div>}

          <button
            type="submit"
            className="btn-verde"
            style={{ margin: '20px auto 20px auto', display: 'block', width: 'auto', cursor: 'pointer', fontSize: '16px' }}
          >
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;
