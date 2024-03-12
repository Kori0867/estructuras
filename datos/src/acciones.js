import React from 'react';
import './App.css';

// Menú de acciones y estructuras de datos
export const menuAcciones = {
  Caja: [
    { accion: "Sumar", precio: 10 },
    { accion: "Quitar_elemento", precio: 40 }
  ],
  Meseros: [
    { accion: "Añadir", precio: 10 },
    { accion: "Consultar", precio: 20 }
  ],
  Cocina: [
    { accion: "Consultar", precio: 20 },
    { accion: "Eliminar_orden", precio: 30 }
  ]
};

export const estructurasDatos = {
  Sumar: "Pila",
  Añadir: "Cola",
  Consultar: "Pila",
  Quitar_elemento: "Cola",
  Eliminar_orden: "Pila"
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h2>Menú de Acciones</h2>
          <div className="menu">
            {Object.entries(menuAcciones).map(([area, acciones]) => (
              <div key={area} className="area-menu">
                <h3>{area}</h3>
                <ul>
                  {acciones.map((accion, index) => (
                    <li key={index}>{accion.accion} - ${accion.precio}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h2>Estructuras de Datos</h2>
          <div className="estructuras">
            {Object.entries(estructurasDatos).map(([accion, estructura]) => (
              <div key={accion} className="estructura">
                <p>{accion} - {estructura}</p>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
