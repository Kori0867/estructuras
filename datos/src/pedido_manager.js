import React, { useState } from 'react';
import './App.css';

class PedidoManager {
  constructor() {
    this.ordenes = [];
  }

  verificarEstructuraVacia() {
    return this.ordenes.length === 0;
  }

  verificarLimiteOrdenes() {
    return this.ordenes.length < 6;
  }

  añadirOrden(pedido) {
    if (!this.verificarLimiteOrdenes()) {
      console.log("No se pueden aceptar más de 6 órdenes al mismo tiempo.");
      return;
    }

    this.ordenes.push(pedido);
    console.log("La orden fue registrada con éxito.");
  }

  consultarOrden(id) {
    const orden = this.ordenes.find(pedido => pedido.id === id);
    if (orden) {
      console.log("Detalles de la orden:");
      console.log(orden);
    } else {
      console.log("No se encontró ninguna orden con el ID especificado.");
    }
  }

  eliminarOrden(id) {
    const index = this.ordenes.findIndex(pedido => pedido.id === id);
    if (index !== -1) {
      this.ordenes.splice(index, 1);
      console.log(`La orden con ID ${id} fue eliminada.`);
    } else {
      console.log("No se encontró ninguna orden con el ID especificado.");
    }
  }

  sumarTotal(id) {
    const orden = this.ordenes.find(pedido => pedido.id === id);
    if (orden) {
      let total = 0;
      orden.elementos.forEach(elemento => {
        total += elemento.precio;
      });
      console.log(`El total de la orden con ID ${id} es: ${total}`);
    } else {
      console.log("No se encontró ninguna orden con el ID especificado.");
    }
  }

  quitarElemento(id, nombreElemento) {
    const orden = this.ordenes.find(pedido => pedido.id === id);
    if (orden) {
      const index = orden.elementos.findIndex(elemento => elemento.nombre === nombreElemento);
      if (index !== -1) {
        orden.elementos.splice(index, 1);
        console.log(`Se quitó el elemento "${nombreElemento}" de la orden con ID ${id}.`);
      } else {
        console.log(`No se encontró el elemento "${nombreElemento}" en la orden con ID ${id}.`);
      }
    } else {
      console.log("No se encontró ninguna orden con el ID especificado.");
    }
  }
}

function App() {
  const [pedidoManager] = useState(new PedidoManager());
  const [nuevaOrden, setNuevaOrden] = useState({ nombre: '', elementos: [], total: 0 });
  const [menu] = useState([
    { id: 1, nombre: "Pizza", precio: 10 },
    { id: 2, nombre: "Hamburguesa", precio: 8 },
    { id: 3, nombre: "Ensalada", precio: 6 }
  ]);

  const handleAddOrderItem = (item) => {
    const updatedOrden = { ...nuevaOrden, elementos: [...nuevaOrden.elementos, item], total: nuevaOrden.total + item.precio };
    setNuevaOrden(updatedOrden);
  };

  const handleDeleteOrderItem = (index) => {
    const updatedElementos = [...nuevaOrden.elementos];
    const deletedElement = updatedElementos.splice(index, 1);
    const updatedOrden = { ...nuevaOrden, elementos: updatedElementos, total: nuevaOrden.total - deletedElement[0].precio };
    setNuevaOrden(updatedOrden);
  };

  const handleClearNewOrder = () => {
    pedidoManager.añadirOrden(nuevaOrden);
    setNuevaOrden({ nombre: '', elementos: [], total: 0 });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h2>Nombre de la Orden</h2>
          <input type="text" value={nuevaOrden.nombre} onChange={(e) => setNuevaOrden({ ...nuevaOrden, nombre: e.target.value })} />
          <h2>Menú</h2>
          <ul>
            {menu.map((item) => (
              <li key={item.id}>
                {item.nombre} - ${item.precio}
                <button onClick={() => handleAddOrderItem(item)}>Añadir</button>
              </li>
            ))}
          </ul>
          <hr />
          <h2>Nueva Orden</h2>
          <h3>{nuevaOrden.nombre}</h3>
          <ul>
            {nuevaOrden.elementos.map((elemento, index) => (
              <li key={index}>
                {elemento.nombre} - ${elemento.precio}
                <button onClick={() => handleDeleteOrderItem(index)}>Quitar</button>
              </li>
            ))}
          </ul>
          <p>Total: ${nuevaOrden.total}</p>
          <button onClick={handleClearNewOrder}>Agregar Orden</button>
        </div>
      </header>
    </div>
  );
}

export default App;
