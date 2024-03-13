import React, { useState } from 'react';
import './App.css';
import PedidoManager from './pedidoManager'; // Importa el componente PedidoManager
import Menu from './Menu'; // Importa la clase Menu

function App() {
  const [nuevaOrden, setNuevaOrden] = useState({ id: 0, nombre: '', elementos: [], total: 0 });
  const [ordenesActivas, setOrdenesActivas] = useState([]);
  const [ordenesEliminadas, setOrdenesEliminadas] = useState([]);

  const handleAddOrderItem = (item) => {
    // Lógica para añadir elementos a la orden
  };

  const handleDeleteOrderItem = (index) => {
    // Lógica para eliminar elementos de la orden
  };

  const handleClearNewOrder = () => {
    // Lógica para limpiar la nueva orden y añadirla a las ordenes activas
  };

  const handleConsultOrder = (id) => {
    // Lógica para consultar una orden
  };

  const handleDeleteOrder = (id) => {
    // Lógica para eliminar una orden
  };

  // Crea una instancia de la clase Menu
  const menu = new Menu();

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="menu-container">
            <h2>Menú</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {menu.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>${item.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pedido-manager-container">
            <h2>Pedidos</h2>
            <PedidoManager
              nuevaOrden={nuevaOrden}
              setNuevaOrden={setNuevaOrden}
              ordenesActivas={ordenesActivas}
              setOrdenesActivas={setOrdenesActivas}
              ordenesEliminadas={ordenesEliminadas}
              setOrdenesEliminadas={setOrdenesEliminadas}
              handleAddOrderItem={handleAddOrderItem}
              handleDeleteOrderItem={handleDeleteOrderItem}
              handleClearNewOrder={handleClearNewOrder}
              handleConsultOrder={handleConsultOrder}
              handleDeleteOrder={handleDeleteOrder}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;