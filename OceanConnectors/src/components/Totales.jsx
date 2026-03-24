import React, { useMemo, useState } from 'react';
import BackButton from './BackButton';

const materialNames = {
  cigarro: 'Colillas de cigarro',
  mad: 'Madera procesada',
  metal: 'Metales',
  microplasticos: 'Microplásticos',
  plastico1uso: 'Plástico de un solo uso',
  plasticoduro: 'Plástico duro',
  tetra: 'Tetra Pak',
  vid: 'Vidrio',
};

const paises = ['México', 'Estados Unidos'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril'];

const registrosData = [
  { material: 'cigarro', pais: 'México', mes: 'Enero', cantidad: 120 },
  { material: 'mad', pais: 'México', mes: 'Enero', cantidad: 60 },
  { material: 'metal', pais: 'Estados Unidos', mes: 'Febrero', cantidad: 80 },
  { material: 'microplasticos', pais: 'México', mes: 'Marzo', cantidad: 40 },
  { material: 'plastico1uso', pais: 'Estados Unidos', mes: 'Abril', cantidad: 110 },
  { material: 'plasticoduro', pais: 'México', mes: 'Marzo', cantidad: 95 },
  { material: 'tetra', pais: 'Estados Unidos', mes: 'Abril', cantidad: 45 },
  { material: 'vid', pais: 'México', mes: 'Enero', cantidad: 75 },
  { material: 'cigarro', pais: 'Estados Unidos', mes: 'Marzo', cantidad: 90 },
  { material: 'metal', pais: 'México', mes: 'Abril', cantidad: 15 },
];

const palette = {
  cigarro: '#E76F51',
  mad: '#2A9D8F',
  metal: '#264653',
  microplasticos: '#F4A261',
  plastico1uso: '#E9C46A',
  plasticoduro: '#A8DADC',
  tetra: '#8AB8C5',
  vid: '#1B4332',
};

const Totales = ({ alVolver }) => {
  // Ahora solo permitimos filtrar por Mes o País
  const [filtroTipo, setFiltroTipo] = useState('mes'); 
  const [filtroValor, setFiltroValor] = useState('todos');

  const valoresFiltro = useMemo(() => {
    if (filtroTipo === 'pais') return ['todos', ...paises];
    return ['todos', ...meses];
  }, [filtroTipo]);

  const datosFiltrados = useMemo(() => {
    if (filtroValor === 'todos') return registrosData;
    return registrosData.filter((item) => item[filtroTipo] === filtroValor);
  }, [filtroTipo, filtroValor]);

  const resumenMaterial = useMemo(() => {
    const totals = {};
    Object.keys(materialNames).forEach(key => totals[key] = 0);

    datosFiltrados.forEach((item) => {
      totals[item.material] += item.cantidad;
    });

    return Object.entries(totals)
      .map(([material, value]) => ({ 
        material: materialNames[material], 
        value, 
        color: palette[material] 
      }))
      .sort((a, b) => b.value - a.value); // Ordenar de mayor a menor
  }, [datosFiltrados]);

  const maxValor = Math.max(...resumenMaterial.map(d => d.value), 1);

  return (
    <div className="contenedor">
      <div style={{position: 'absolute', top: '20px', left: '20px'}}>
        <BackButton alVolver={alVolver} />
      </div>

      <div className="contenedorb">
        <h1 className="titulo-mision" style={{ fontSize: '24px', marginBottom: '10px' }}>
        ¿Qué encontramos en la playa?
        </h1>

        <div className="filtros-totales" style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <label style={{ flex: 1 }}>
            Ver por:
            <select value={filtroTipo} onChange={(e) => { setFiltroTipo(e.target.value); setFiltroValor('todos'); }}>
              <option value="mes">📅 Mes</option>
              <option value="pais">🌍 País</option>
            </select>
          </label>
          <label style={{ flex: 1 }}>
            Filtro:
            <select value={filtroValor} onChange={(e) => setFiltroValor(e.target.value)}>
              {valoresFiltro.map((v) => (
                <option key={v} value={v}>{v === 'todos' ? 'Todos' : v}</option>
              ))}
            </select>
          </label>
        </div>

        {/* GRÁFICA DE BARRAS PARA NIÑOS */}
        <div className="grafica-barras" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {resumenMaterial.map((item) => (
            <div key={item.material} style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold', color: '#0D3B66' }}>
                <span>{item.material}</span>
                <span>{item.value} unidades</span>
              </div>
              <div style={{ 
                backgroundColor: '#f0f0f0', 
                borderRadius: '10px', 
                height: '25px', 
                width: '100%',
                overflow: 'hidden' 
              }}>
                <div style={{ 
                  backgroundColor: item.color, 
                  width: `${(item.value / maxValor) * 100}%`, 
                  height: '100%',
                  borderRadius: '10px',
                  transition: 'width 0.8s ease-out'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Totales;