# 🐾 Adopciones Mascotas - E-commerce & Adopciones

Una aplicación web completa que combina un sistema de adopción de mascotas con una tienda online de productos para mascotas.

## ✨ Características

### 🛒 E-commerce
- **Catálogo de productos** con diseño moderno
- **Carrito de compras** funcional
- **Control de stock** en tiempo real
- **Sistema de pagos** simulado
- **Gestión de productos** dinámica

### 🏠 Adopciones
- **Galería de mascotas** disponibles para adopción
- **Información detallada** de cada mascota
- **Formulario de adopción** integrado
- **Modales informativos** con fotos y detalles

### 🎨 Diseño & UX
- **Diseño responsive** para todos los dispositivos
- **Animaciones suaves** y efectos visuales
- **Modal de imágenes** en tamaño completo
- **Navegación intuitiva** y moderna
- **Interfaz profesional** tipo e-commerce

## 🛠️ Tecnologías Utilizadas

### Backend
- **Python 3.x**
- **Flask** - Framework web
- **Flask-CORS** - Manejo de CORS
- **JSON** - Intercambio de datos

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos (Grid, Flexbox, Animaciones)
- **JavaScript (ES6+)** - Interactividad y APIs
- **Unicons** - Iconografía

### Herramientas
- **VS Code** - Editor de código
- **Postman** - Testing de APIs
- **Git** - Control de versiones

## 🚀 Instalación y Configuración

### Prerrequisitos
- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/adopciones-mascotas.git
cd adopciones-mascotas
```

2. **Crear entorno virtual**
```bash
python -m venv venv
```

3. **Activar entorno virtual**
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. **Instalar dependencias**
```bash
pip install flask flask-cors
```

5. **Ejecutar el servidor**
```bash
cd backend
python app.py
```

6. **Abrir en el navegador**
```
http://localhost:5000
```

## 📁 Estructura del Proyecto

```
adopciones-mascotas/
├── backend/
│   ├── app.py              # Servidor Flask
│   └── venv/               # Entorno virtual
├── css/
│   ├── estilos.css         # Estilos principales
│   ├── productos.css       # Estilos de productos
│   ├── adopciones.css      # Estilos de adopciones
│   └── carrito.css         # Estilos del carrito
├── js/
│   ├── index.js            # JavaScript principal
│   ├── carrito.js          # Lógica del carrito
│   ├── modal.js            # Manejo de modales
│   └── imagen-modal.js     # Modal de imágenes
├── img/                    # Imágenes del proyecto
├── index.html              # Página principal
├── producto.html           # Catálogo de productos
├── adoptar.html            # Página de adopciones
├── carrito.html            # Página del carrito
├── contacto.html           # Página de contacto
├── ingresar.html           # Página de login
└── README.md               # Este archivo
```

## 🔧 API Endpoints

### Productos
- `GET /productos` - Obtener todos los productos
- `GET /img/<filename>` - Servir imágenes

### Carrito
- `GET /carrito` - Obtener contenido del carrito
- `POST /carrito` - Agregar producto al carrito
- `DELETE /carrito/eliminar/<id>` - Eliminar producto
- `DELETE /carrito/vaciar` - Vaciar carrito
- `GET /carrito/total` - Calcular total
- `POST /carrito/pagar` - Procesar pago

## 🎯 Funcionalidades Principales

### Sistema de Productos
- Listado dinámico de productos
- Filtrado por disponibilidad
- Gestión de stock automática
- Imágenes optimizadas

### Carrito de Compras
- Agregar/eliminar productos
- Cálculo automático de totales
- Persistencia de datos
- Proceso de checkout

### Sistema de Adopciones
- Galería de mascotas disponibles
- Información detallada de cada mascota
- Formulario de solicitud de adopción
- Gestión de estados de adopción

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🔒 Características de Seguridad

- Validación de datos en frontend y backend
- Control de CORS configurado
- Sanitización de inputs
- Manejo seguro de archivos estáticos

## 🚀 Despliegue

### Desarrollo Local
```bash
python app.py
```

### Producción (Recomendado)
- **Heroku** - Plataforma como servicio
- **Vercel** - Despliegue frontend
- **AWS** - Infraestructura escalable
- **DigitalOcean** - VPS económico

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

## 🙏 Agradecimientos

- Imágenes de mascotas proporcionadas por [fuente]
- Iconos de [Unicons](https://unicons.iconscout.com/)
- Inspiración de diseño de [referencias]

## 📞 Contacto

- Email: tu-email@ejemplo.com
- Proyecto: [https://github.com/tu-usuario/adopciones-mascotas](https://github.com/tu-usuario/adopciones-mascotas)

---

⭐ Si este proyecto te ayudó, ¡dale una estrella!
