// Clase Menu para manejar el menú de la pizzería
class Menu {
    constructor() {
      this.items = [
        { categoria: "Pizzas" },
        { numero: 1, nombre: "Pizza especial", precio: 289 },
        { numero: 2, nombre: "Pizza campesina", precio: 289 },
        { numero: 3, nombre: "Pizza Pancho Villa", precio: 289 },
        { numero: 4, nombre: "Pizza norteña", precio: 320 },
        { numero: 5, nombre: "Pizza chicken-bufalo", precio: 289 },
        { categoria: "Boneless" },
        { numero: 11, nombre: "Naturales", precio: 175 },
        { numero: 12, nombre: "Búfalo", precio: 175 },
        { numero: 13, nombre: "Mango-habanero", precio: 175 },
        { numero: 14, nombre: "BBQ", precio: 175 },
        { categoria: "Spagetti" },
        { numero: 6, nombre: "De la casa", precio: 175 },
        { numero: 7, nombre: "Con crema", precio: 175 },
        { numero: 8, nombre: "Chorizo", precio: 175 },
        { numero: 9, nombre: "Boloñés", precio: 175 },
        { categoria: "Papas fritas" },
        { numero: 15, nombre: "Chicas", precio: 110 },
        { numero: 16, nombre: "Grandes", precio: 165 },
        { categoria: "Ensaladas" },
        { numero: 17, nombre: "Chicas", precio: 110 },
        { numero: 18, nombre: "Grandes", precio: 165 },
        { categoria: "Bebidas" },
        { numero: 19, nombre: "Agua natural", precio: 28 },
        { numero: 20, nombre: "Coca cola", precio: 28 },
        { numero: 21, nombre: "Fanta", precio: 28 },
        { numero: 22, nombre: "Uva", precio: 28 },
        { numero: 23, nombre: "Fresa", precio: 28 },
        { numero: 24, nombre: "Naranja", precio: 28 },
        { numero: 25, nombre: "Manzanita", precio: 28 }
      ];
    }
  
    // Método para agregar un nuevo elemento al menú
    agregarItem(item) {
      this.items.push(item);
    }
  
    // Método para eliminar un elemento del menú por su ID
    eliminarItem(id) {
      this.items = this.items.filter(item => item.numero !== id);
    }
  }
  
  export default Menu;
  