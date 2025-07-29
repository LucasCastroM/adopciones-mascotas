// Modal para ver imágenes en tamaño completo
document.addEventListener('DOMContentLoaded', function() {
    const modalImagen = document.getElementById('modalImagen');
    const imagenAmpliada = document.getElementById('imagenAmpliada');
    const cerrarModalImagen = document.getElementById('cerrarModalImagen');
    
    // Función para abrir el modal de imagen
    function abrirModalImagen(src, alt) {
        imagenAmpliada.src = src;
        imagenAmpliada.alt = alt;
        modalImagen.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
    
    // Función para cerrar el modal de imagen
    function cerrarModalImagenFunc() {
        modalImagen.classList.remove('show');
        document.body.style.overflow = ''; // Restaurar scroll
    }
    
    // Agregar event listeners a todas las imágenes de productos y mascotas
    const imagenes = document.querySelectorAll('section.grid .card img, section.grid .producto-imagen img');
    
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            abrirModalImagen(this.src, this.alt);
        });
    });
    
    // Cerrar modal al hacer clic en el botón de cerrar
    cerrarModalImagen.addEventListener('click', cerrarModalImagenFunc);
    
    // Cerrar modal al hacer clic fuera de la imagen
    modalImagen.addEventListener('click', function(e) {
        if (e.target === modalImagen) {
            cerrarModalImagenFunc();
        }
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalImagen.classList.contains('show')) {
            cerrarModalImagenFunc();
        }
    });
});