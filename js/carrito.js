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
    if (!grid) return; // Si no estamos en la página de productos
    
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

// Función para cargar y mostrar el carrito
async function cargarCarrito() {
    try {
        const [carritoResponse, totalResponse] = await Promise.all([
            fetch(`${API_URL}/carrito`),
            fetch(`${API_URL}/carrito/total`)
        ]);
        
        const carrito = await carritoResponse.json();
        const total = await totalResponse.json();
        
        mostrarCarrito(carrito, total);
    } catch (error) {
        console.error('Error al cargar carrito:', error);
    }
}

// Función para mostrar el carrito en la página
function mostrarCarrito(carrito, total) {
    const productosCarrito = document.querySelector('.productos-carrito');
    const carritoVacio = document.querySelector('.carrito-vacio');
    const carritoContent = document.querySelector('.carrito-content');
    
    if (!productosCarrito) return; // Si no estamos en la página del carrito
    
    if (carrito.length === 0) {
        // Mostrar mensaje de carrito vacío
        carritoVacio.style.display = 'block';
        carritoContent.style.display = 'none';
        return;
    }
    
    // Ocultar mensaje de carrito vacío y mostrar contenido
    carritoVacio.style.display = 'none';
    carritoContent.style.display = 'grid';
    
    // Mostrar productos del carrito
    productosCarrito.innerHTML = '';
    carrito.forEach(producto => {
        const productoHTML = `
            <div class="producto-carrito">
                <div class="producto-carrito-imagen">
                    <img src="${API_URL}/${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="producto-carrito-info">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <div class="producto-carrito-precio">$${producto.precio}</div>
                </div>
                <div class="producto-carrito-controles">
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${producto.id})">
                        <i class="uil uil-trash-alt"></i>
                        Eliminar
                    </button>
                </div>
            </div>
        `;
        productosCarrito.innerHTML += productoHTML;
    });
    
    // Actualizar resumen
    actualizarResumen(total);
}

// Función para actualizar el resumen del carrito
function actualizarResumen(total) {
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.total-precio');
    
    if (subtotalElement && totalElement) {
        subtotalElement.textContent = `$${total.total}`;
        totalElement.textContent = `$${total.total}`;
    }
}

// Función para eliminar producto del carrito
async function eliminarDelCarrito(productoId) {
    try {
        const response = await fetch(`${API_URL}/carrito/eliminar/${productoId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Producto eliminado del carrito');
            cargarCarrito(); // Recargar el carrito
        } else {
            alert('Error al eliminar el producto');
        }
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        alert('Error al eliminar del carrito');
    }
}

// Función para vaciar el carrito
async function vaciarCarrito() {
    if (!confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/carrito/vaciar`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Carrito vaciado');
            cargarCarrito(); // Recargar el carrito
        } else {
            alert('Error al vaciar el carrito');
        }
    } catch (error) {
        console.error('Error al vaciar carrito:', error);
        alert('Error al vaciar el carrito');
    }
}

// Función para procesar el pago
async function pagarCarrito() {
    try {
        const response = await fetch(`${API_URL}/carrito/pagar`, {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(`¡Compra exitosa! Total: $${data.total}`);
            cargarCarrito(); // Recargar el carrito (debería estar vacío)
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error al procesar pago:', error);
        alert('Error al procesar el pago');
    }
}

// Función para actualizar información del carrito (para la página de productos)
async function actualizarCarrito() {
    try {
        const [carritoResponse, totalResponse] = await Promise.all([
            fetch(`${API_URL}/carrito`),
            fetch(`${API_URL}/carrito/total`)
        ]);
        
        const carrito = await carritoResponse.json();
        const total = await totalResponse.json();
        
        // Aquí puedes actualizar la UI del carrito en la página de productos
        console.log('Carrito:', carrito);
        console.log('Total:', total);
    } catch (error) {
        console.error('Error al actualizar carrito:', error);
    }
}

// Cargar productos cuando se carga la página de productos
document.addEventListener('DOMContentLoaded', () => {
    // Detectar en qué página estamos
    const grid = document.querySelector('.grid');
    const productosCarrito = document.querySelector('.productos-carrito');
    
    if (grid) {
        // Estamos en la página de productos
        cargarProductos();
    } else if (productosCarrito) {
        // Estamos en la página del carrito
        cargarCarrito();
    }
});