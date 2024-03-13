import React, { useState } from 'react';
import './App.css';
import Menu from './Menu';

class PedidoManager {
  constructor() {
    this.ordenes = [];
    this.cola = [];
    this.pila = [];
    this.idCount = 1;
  }

  verificarEstructuraVacia(structure) {
    return structure.length === 0;
  }

  verificarLimiteOrdenes() {
    return this.ordenes.length < 6;
  }

  añadirOrden(pedido) {
    if (!this.verificarLimiteOrdenes()) {
      console.log("No se pueden aceptar más de 6 órdenes al mismo tiempo.");
      return;
    }
    pedido.id = this.idCount++;
    this.ordenes.push(pedido);
    this.cola.push(pedido);
    console.log("La orden fue registrada con éxito.");
  }

  consultarOrden(id) {
    const orden = this.ordenes.find(pedido => pedido.id === id);
    if (orden) {
      console.log(`Detalles de la orden con ID ${orden.id}:`);
      console.log(`Nombre: ${orden.nombre}`);
      console.log("Elementos:");
      orden.elementos.forEach(elemento => {
        console.log(`- ${elemento.nombre} - $${elemento.precio}`);
      });
      console.log(`Total: $${orden.total}`);
    } else {
      console.log("No se encontró ninguna orden con el ID especificado.");
    }
  }

  modificarOrden(id, nuevaOrden) {
    const index = this.ordenes.findIndex(pedido => pedido.id === id);
    if (index !== -1) {
      this.ordenes[index] = nuevaOrden;
      console.log(`La orden con ID ${id} fue modificada.`);
    } else {
      console.log("No se encontró ninguna orden con el ID especificado.");
    }
  }

  eliminarOrden(id) {
    const index = this.ordenes.findIndex(pedido => pedido.id === id);
    if (index !== -1) {
      this.ordenes.splice(index, 1);
      this.pila.push(id);
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

  sumarTotalGlobal() {
    let totalGlobal = 0;
    this.ordenes.forEach(orden => {
      totalGlobal += orden.total;
    });
    return totalGlobal;
  }
}

function App() {
  const [pedidoManager] = useState(new PedidoManager());
  const [nuevaOrden, setNuevaOrden] = useState({ id: 0, nombre: '', elementos: [], total: 0 });
  const [ordenesActivas, setOrdenesActivas] = useState([]);
  const [ordenesEliminadas, setOrdenesEliminadas] = useState([]);
  const [ordenModificando, setOrdenModificando] = useState(null);
  const [modoModificacion, setModoModificacion] = useState(false);
  const [elementoNuevo, setElementoNuevo] = useState({ nombre: '', precio: 0 });

  const handleClearNewOrder = () => {
    pedidoManager.añadirOrden(nuevaOrden);
    setOrdenesActivas([...ordenesActivas, nuevaOrden]);
    setNuevaOrden({ id: nuevaOrden.id + 1, nombre: '', elementos: [], total: 0 });
  };

  const handleConsultOrder = (id) => {
    const orden = ordenesActivas.find(orden => orden.id === id);
    if (orden) {
      setOrdenModificando(orden);
      let orderDetails = `Detalles de la orden con ID ${orden.id}:\n`;
      orderDetails += `Nombre: ${orden.nombre}\n`;
      orderDetails += "Elementos:\n";
      orden.elementos.forEach(elemento => {
        orderDetails += `- ${elemento.nombre} - $${elemento.precio}\n`;
      });
      orderDetails += `Total: $${orden.total}`;
      alert(orderDetails);
    } else {
      alert("No se encontró ninguna orden activa con el ID especificado.");
    }
  };

  const handleModifyOrder = () => {
    if (modoModificacion) {
      pedidoManager.modificarOrden(ordenModificando.id, nuevaOrden);
      const updatedOrders = ordenesActivas.map(order => (order.id === ordenModificando.id ? nuevaOrden : order));
      setOrdenesActivas(updatedOrders);
      setOrdenModificando(null);
      setModoModificacion(false);
      setNuevaOrden({ id: 0, nombre: '', elementos: [], total: 0 });
    } else {
      setModoModificacion(true);
      setNuevaOrden(ordenModificando);
    }
  };

  const handleDeleteModification = () => {
    setModoModificacion(false);
    setNuevaOrden({ id: 0, nombre: '', elementos: [], total: 0 });
  };

  const handleDeleteOrder = (id) => {
    pedidoManager.eliminarOrden(id);
    const activeOrdersCopy = [...ordenesActivas];
    const deletedOrder = activeOrdersCopy.find(order => order.id === id);
    if (deletedOrder) {
      setOrdenesEliminadas([...ordenesEliminadas, deletedOrder]);
      const updatedOrders = activeOrdersCopy.filter(order => order.id !== id);
      setOrdenesActivas(updatedOrders);
    }
  };

  const handleAddElement = () => {
    setNuevaOrden({ ...nuevaOrden, elementos: [...nuevaOrden.elementos, elementoNuevo], total: nuevaOrden.total + elementoNuevo.precio });
    setElementoNuevo({ nombre: '', precio: 0 });
  };

  const handleRemoveElement = (index) => {
    const updatedElements = [...nuevaOrden.elementos];
    const removedItem = updatedElements.splice(index, 1)[0];
    setNuevaOrden({ ...nuevaOrden, elementos: updatedElements, total: nuevaOrden.total - removedItem.precio });
  };

  const handleMenuSelection = (numero) => {
    const selectedMenuItem = menu.find(item => item.numero === numero);
    if (selectedMenuItem) {
      setElementoNuevo({ nombre: selectedMenuItem.nombre, precio: selectedMenuItem.precio });
    } else {
      setElementoNuevo({ nombre: '', precio: 0 });
    }
  };

  const handlePrintTicket = (orden) => {
    const ticketContent = `
      ========================
      |      TICKET          |
      ========================
      
      Nombre de la Orden: ${orden.nombre}
      
      Elementos:
      ${orden.elementos.map(elemento => `- ${elemento.nombre} - $${elemento.precio}`).join('\n')}
      
      Total: $${orden.total}
      
      ========================
      |   Gracias por su     |
      |     compra!          |
      ========================
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Ticket</title></head><body>');
    printWindow.document.write(`<pre>${ticketContent}</pre>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  
  const menu = new Menu().items;

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h2>Nombre de la Orden</h2>
          <input type="text" value={nuevaOrden.nombre} onChange={(e) => setNuevaOrden({ ...nuevaOrden, nombre: e.target.value })} />
          <h2>Menú</h2>
          <table>
            <tbody>
              {menu.map((item) => (
                <tr key={item.numero}>
                  <td>{item.numero}</td>
                  <td>{item.categoria}</td>
                  <td>{item.nombre}</td>
                  <td>${item.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <h2>Nueva Orden</h2>
          <h3>{nuevaOrden.nombre}</h3>
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Nombre del Elemento</th>
                <th>Precio</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="number" onChange={(e) => handleMenuSelection(parseInt(e.target.value))} /></td>
                <td>{elementoNuevo.nombre}</td>
                <td>${elementoNuevo.precio}</td>
                <td><button onClick={handleRemoveElement}>Eliminar</button></td>
              </tr>
            </tbody>
          </table>
          <p>Total: ${nuevaOrden.total}</p>
          <button onClick={handleAddElement}>Agregar Elemento</button>
          {modoModificacion ? (
            <>
              <button onClick={handleModifyOrder}>Guardar Modificación</button>
              <button onClick={handleDeleteModification}>Eliminar Modificación</button>
            </>
          ) : (
            <button onClick={handleClearNewOrder}>Agregar Orden</button>
          )}

          <hr />
          <h2>Órdenes Activas</h2>
          <ul>
            {ordenesActivas.map((orden) => (
              <li key={orden.id}>
                {orden.nombre} - <button onClick={() => handleConsultOrder(orden.id)}>Consultar</button>
                {ordenModificando && ordenModificando.id === orden.id ? (
                  <button onClick={handleModifyOrder}>Modificar</button>
                ) : (
                  <>
                    <button onClick={() => setOrdenModificando(orden)}>Modificar</button>
                    <button onClick={() => handleDeleteOrder(orden.id)}>Eliminar</button>
                  </>
                )}
                <button onClick={() => handlePrintTicket(orden)}>Imprimir Ticket</button>
              </li>
            ))}
          </ul>

          <hr />
          <h2>Órdenes Eliminadas</h2>
          <ul>
            {ordenesEliminadas.map((orden) => (
              <li key={orden.id}>
                {orden.nombre}
                <button onClick={() => handlePrintTicket(orden)}>Imprimir Ticket</button>
              </li>
            ))}
         </ul>

          <hr />
         
        </div>
      </header>
    </div>
  );
}

export default App;
