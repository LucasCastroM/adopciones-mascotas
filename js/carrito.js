const API_URL = 'http://localhost:5000';

async function cargarProductos(){
    try{
        const response = await fetch(`${API_URL}/productos`);
        const productos = await response.json();
        mostrarProductos(productos);
    } catch(error){
        console.error('Error al cargar productos:', error);
    }
}

function mostrarProductos(productos) {
    const grid = document.querySelector('.grid');
    grid.innerHTML = ''; // Limpiar contenido actual
    
    productos.forEach(producto => {
        const card = `
            <div class="producto-card">
                <div class="producto-imagen">
                    <img src="${API_URL}/${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="producto-contenido">
                    <h3 class="producto-nombre">${producto.nombre}</h3>
                    <p class="producto-descripcion">${producto.descripcion}</p>
                    <div class="producto-info">
                        <span class="producto-precio">$${producto.precio}</span>
                        <span class="producto-stock ${producto.stock > 0 ? 'disponible' : 'agotado'}">
                            ${producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
                        </span>
                    </div>
                    <div class="botones">
                        <button onclick="agregarAlCarrito(${producto.id})" 
                                class="boton primario" 
                                ${producto.stock <= 0 ? 'disabled' : ''}>
                            <i class="uil uil-shopping-cart-alt"></i>
                            ${producto.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                        </button>
                        <button class="boton secundario">
                            <i class="uil uil-bookmark-full"></i>
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}
// Función para agregar producto al carrito
async function agregarAlCarrito(productoId) {
    try {
        const response = await fetch(`${API_URL}/carrito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: productoId })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Producto agregado al carrito');
            actualizarCarrito();
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        alert('Error al agregar al carrito');
    }
}

// Función para actualizar información del carrito
async function actualizarCarrito() {
    try {
        const [carritoResponse, totalResponse] = await Promise.all([
            fetch(`${API_URL}/carrito`),
            fetch(`${API_URL}/carrito/total`)
        ]);
        
        const carrito = await carritoResponse.json();
        const total = await totalResponse.json();
        
        // Aquí puedes actualizar la UI del carrito
        console.log('Carrito:', carrito);
        console.log('Total:', total);
    } catch (error) {
        console.error('Error al actualizar carrito:', error);
    }
}

// Cargar productos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});