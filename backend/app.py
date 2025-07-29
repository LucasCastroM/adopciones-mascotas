from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Configurar para servir archivos estáticos
@app.route('/img/<path:filename>')
def serve_image(filename):
    return send_from_directory('../img', filename)

productos = [
    {
        "id": 1,
        "nombre": "Collar para perro",
        "precio": 100,
        "descripcion": "Collar de cuero resistente con hebilla de seguridad",
        "imagen": "img/collar1.jpg",
        "stock": 10
    },
    {
        "id": 2,
        "nombre": "Collar GPS",
        "precio": 200,
        "descripcion": "Collar GPS con batería de litio y rastreo en tiempo real",
        "imagen": "img/collar3.png",
        "stock": 5
    },
    {
        "id": 3,
        "nombre": "Juguete dispensador",
        "precio": 300,
        "descripcion": "Juguete dispensador de comida para estimular la mente",
        "imagen": "img/juguete1.jpg",
        "stock": 8
    },
    {
        "id": 4,
        "nombre": "Juguete interactivo",
        "precio": 150,
        "descripcion": "Juguete interactivo para estimular la mente de tu mascota",
        "imagen": "img/juguete.jpg",
        "stock": 12
    },
    {
        "id": 5,
        "nombre": "Juguete dispensador ",
        "precio": 180,
        "descripcion": "Juguete interactivo para estimular la mente de tu mascota",
        "imagen": "img/comida1.jpg",
        "stock": 20
    },
    {
        "id": 6,
        "nombre": "Juguete dispensador para Gatos",
        "precio": 220,
        "descripcion": "Para que tu gato se entretenga y obtenga premios.",
        "imagen": "img/comida2.jpg",
        "stock": 15
    },
    {
        "id": 7,
        "nombre": "Juguete para gatos",
        "precio": 160,
        "descripcion": "...",
        "imagen": "img/comida3.jpg",
        "stock": 18
    },
    {
        "id": 8,
        "nombre": "Comida premium plus",
        "precio": 280,
        "descripcion": "Comida premium plus con vitaminas y omega 3",
        "imagen": "img/comida4.jpg",
        "stock": 10
    },
    {
        "id": 9,
        "nombre": "Suéter con capucha",
        "precio": 250,
        "descripcion": "Suéter con capucha abrigado para mascotas pequeñas",
        "imagen": "img/ropa1.jpeg",
        "stock": 8
    },
    {
        "id": 10,
        "nombre": "Ropa deportiva",
        "precio": 180,
        "descripcion": "Ropa deportiva cómoda para actividades al aire libre",
        "imagen": "img/ropa2.jpg",
        "stock": 6
    },
    {
        "id": 11,
        "nombre": "Ropa elegante",
        "precio": 320,
        "descripcion": "Ropa elegante para ocasiones especiales y eventos",
        "imagen": "img/ropa3.jpg",
        "stock": 4
    }
]
carrito = []

@app.route('/')
def home():
    return send_from_directory('..', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('..', filename)

@app.route('/productos')
def get_productos():
    return jsonify(productos)
@app.route('/carrito')
def get_carrito():
    return jsonify(carrito)

@app.route('/carrito', methods=['POST'])
def agregar_carrito():

    data = request.get_json()
    producto_id = data.get('id')
    cantidad = data.get('cantidad', 1)



    producto = next((p for p in productos if p['id']== producto_id), None)
    if producto:
        if producto['stock'] >= cantidad:
            producto['stock'] -= cantidad
            carrito.append(producto)
            return jsonify({"message": "Producto agregado al carrito", "carrito": carrito})
        else:
            return jsonify({"error": "No hay suficiente stock"}), 400
    else:
        return jsonify({"error": "Producto no encontrado"}), 404

@app.route('/carrito/total')
def calcular_total():
    total = sum(producto['precio'] for producto in carrito)
    return jsonify({
        "total": total,
        "cantidad_productos": len(carrito)
    })
@app.route('/carrito/eliminar/<int:producto_id>', methods=['DELETE'])
def eliminar_producto(producto_id):
    producto_encontrado = None
    for i, producto in enumerate(carrito):
        if producto['id'] == producto_id:
            producto_encontrado = carrito.pop(i)
            break
    if producto_encontrado:
        return jsonify({
            "message": "Producto eliminado del carrito",
            "carrito": carrito
        })
    else:
        return jsonify({"error": "Producto no encontrado"}), 404
@app.route('/carrito/vaciar', methods=['DELETE'])
def vaciar_carrito():
    carrito.clear()
    return jsonify({
        "message": "Carrito vaciado",
        "carrito": carrito
    })
@app.route('/carrito/pagar', methods=['POST'])
def pagar_carrito():
    if not carrito:
        return jsonify({"error": "El carrito está vacío"}), 400
    
    total = sum(producto['precio'] for producto in carrito)
    carrito.clear()
    return jsonify({
        "message": "Compra realizada con éxito",
        "total": total,
        "carrito": carrito
    })

@app.route('/productos/stock')
def ver_stock():
    stock_info = []
    for producto in productos:
        stock_info.append({
            "id": producto['id'],
            "nombre": producto['nombre'],
            "stock": producto['stock'],
            "disponible": producto['stock'] > 0
        })
    return jsonify(stock_info)

if __name__ == '__main__':

    app.run(debug=True)
