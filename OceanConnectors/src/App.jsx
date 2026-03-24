import { useState } from 'react';
import './App.css';
import Contacto from './components/Contacto';
import InicioSesion from './components/InicioSesion';
import MenuEstaciones from './components/MenuEstaciones';
import Mision from './components/Mision';
import Registro from './components/registro';
import Tabla from './components/tabla';
import Totales from './components/Totales';


function App() {
  const [vista, setVista] = useState('inicio');

  // Función para cambiar de vista y cerrar el menú al mismo tiempo
  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) menuToggle.checked = false; // Esto cierra el menú
  };

  return (
    <div className={vista === 'inicio' ? 'layout-inicio' : 'layout-app'}>
      
      {/* header: Siempre fijo arriba */}
      <nav className="contenedorsup">
        <img 
          src="/imagenes/logo.png" 
          alt="logo" 
          className="logo-img" 
          onClick={() => setVista('inicio')} 
        />
        <input type="checkbox" id="menu-toggle" style={{ display: 'none' }} />
        <label for="menu-toggle" class="menu-icon">☰</label>
        <ul className="menu">
          <li><button onClick={() => cambiarVista('registro')} className="btn-nav">REGISTRO</button></li>
          <li><button onClick={() => cambiarVista('mision')} className="btn-nav">MISIÓN</button></li>
          <li><button onClick={() => cambiarVista('contacto')} className="btn-nav">CONTACTO</button></li>
          <li><button onClick={() => cambiarVista('totales')} className="btn-nav">GRAFICAS</button></li>
          <li><button onClick={() => cambiarVista('iniciosesion')} className="btn-nav">INICIAR SESION</button></li>
        </ul>
      </nav>

      {/* contenido, Aquí es donde se centra la tarjeta */}
      <main className="seccion-principal">
        {vista === 'inicio' && (
          <div className="home-content">
            <h1 className="titulo-principal">
              HAGAMOS CIENCIA CON LA BASURA<br /> EN LAS PLAYAS DE MÉXICO 
            </h1>
            <p className="descripcion">
              Registra residuos encontrados y contribuye al análisis<br /> 
              ambiental para mejorar nuestras playas 
            </p>
            <div className="seccion-registro">
              <button className="btn-verde" onClick={() => setVista('registro')}> 
                NUEVO REGISTRO 
              </button>
            </div>
          </div>
        )}
        {vista === 'mision' && <Mision alVolver={() => setVista('inicio')} />}
        {vista === 'contacto' && <Contacto alVolver={() => setVista('inicio')} />}
        {vista === 'totales' && <Totales alVolver={() => setVista('inicio')} />}
        {vista === 'registro' && <Registro alVolver={() => setVista('inicio')} alSiguiente={() => setVista('menuEstaciones')} />}
        {vista === 'iniciosesion' && <InicioSesion alVolver={() => setVista('inicio')} />}
        {vista === 'tabla' && <Tabla alVolver={() => setVista('menuEstaciones')} alSiguiente={() => setVista('menuEstaciones')} />}
        {/* Configuración del Menú de Estaciones */}
{vista === 'menuEstaciones' && (
  <MenuEstaciones 
    alVolver={() => setVista('registro')} 
    alEstacion1={() => setVista('estacion1')} 
    alEstacion2={() => setVista('estacion2')} 
    alEstacion3={() => setVista('estacion3')} 
    alFinalizar={() => setVista('inicio')}
  />
)}

{/* Estación 1 */}
{vista === 'estacion1' && (
  <Tabla 
    titulo="ESTACIÓN 1" 
    storageKey="datosEstacion1" 
    alVolver={() => setVista('menuEstaciones')} 
    alSiguiente={() => setVista('menuEstaciones')} 
  />
)}

{/* Estación 2 */}
{vista === 'estacion2' && (
  <Tabla 
    titulo="ESTACIÓN 2" 
    storageKey="datosEstacion2" 
    alVolver={() => setVista('menuEstaciones')} 
    alSiguiente={() => setVista('menuEstaciones')} 
  />
)}

{/* Estación 3 */}
{vista === 'estacion3' && (
  <Tabla 
    titulo="ESTACIÓN 3" 
    storageKey="datosEstacion3" 
    alVolver={() => setVista('menuEstaciones')} 
    alSiguiente={() => setVista('menuEstaciones')} 
  />
)}
      </main>
    </div>
  )
}

export default App