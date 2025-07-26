from flask import Flask, jsonify, request

app = Flask(__name__)
productos = [
     {
        "id": 1,
        "nombre": "Collar",
        "precio": 100,
        "descripcion": "Collar de cuero",
        "imagen": "img/collar1.png",
        "stock": 10
    },
    {
        "id": 2,
        "nombre": "Hueso",
        "precio": 200,
        "descripcion": "Hueso de goma",
        "imagen": "img/hueso1.png",
        "stock": 10
    },
    {
        "id": 3,
        "nombre": "Juguete dispensador de comida",
        "precio": 300,
        "descripcion": "Juguete dispensador de comida",
        "imagen": "img/juguete1.png",
        "stock": 0
    }
]
carrito = []

@app.route('/')
def home():
    return "Hello, World!"

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
