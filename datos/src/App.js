import React from 'react';
import './App.css';
import PedidoManager from './pedido_manager'; 
import { menuAcciones } from './acciones'; // Cambia el import para importar como un objeto nombrado

function App() {
  // Usa menuAcciones si es necesario
  console.log(menuAcciones);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <PedidoManager />
        </div>
      </header>
    </div>
  );
}

export default App;
