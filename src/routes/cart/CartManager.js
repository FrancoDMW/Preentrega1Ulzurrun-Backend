const fs = require('fs')
const uuid4 = require('uuid4')
class CartManager {
    constructor(path) {
        this.path = path
        this.cart = []
    }
    createCart() {
        let id = uuid4()
        let idCount = id
        let products = []
        let newCart = { id: id, products: products }
        this.cart.push(newCart)
        fs.writeFileSync(this.path, JSON.stringify(this.cart, null, 2), 'utf-8')
        return idCount
    }
    getCartById(cId) {
        let read = fs.readFileSync(this.path, "utf-8");
        let parse = JSON.parse(read);
        let productoFiltrado = parse.find((prod) => prod.id == cId);
        if (productoFiltrado == undefined) {
            throw new Error(`Error! no se encontro ese id`);
        }
        else {
            return productoFiltrado;
        }
    }
    addToCart(cId, pId) {
        let products = fs.readFileSync('./src/routes/products/Products.json', 'utf-8')
        let parseproducts = JSON.parse(products)
        let productFind = parseproducts.find((prod) => prod.id == (pId.toString()));

        if (productFind == undefined) {
            throw new Error(`Error! no se encontro ese id ---- error 1`);
        } else {
            let read = fs.readFileSync(this.path, "utf-8");
            let parse = JSON.parse(read);

            let cartFind = parse.find((prod) => prod.id === cId);
            if (cartFind == undefined) {
                throw new Error(`Error! no se encontro ese id ---- error 2`);
            } else {
                let indexProduct = cartFind.products.findIndex((prod) => prod.id === pId)
                if (indexProduct != -1) {
                    cartFind.products[indexProduct].quantity++
                    this.cart.push(cartFind)
                    fs.writeFileSync(this.path, JSON.stringify(this.cart, null, 2), "utf-8");
                }
                else {
                    cartFind.products.push({ id: pId, quantity: 1 })
                    this.cart.push(cartFind)
                    fs.writeFileSync(this.path, JSON.stringify(this.cart, null, 2), "utf-8");
                }
            }
        }
    }
}
module.exports = CartManager