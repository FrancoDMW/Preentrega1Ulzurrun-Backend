const CartManager = require('./CartManager')
const express = require('express')
const { Router } = express
const router = new Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/', (req, res) => {
    let path = './src/routes/cart/Cart.json'
    let newCart = new CartManager(path);
    newCart.createCart()
    res.send('Nuevo carrito agregado!')
})
router.get('/:cId', (req, res) => {
    let path = './src/routes/cart/Cart.json'
    let getCart = new CartManager(path);
    const cId = req.params.cId
    const cart = getCart.getCartById(cId)
    let carrito = JSON.stringify(cart)
    res.send(`IdCarrito: ${cId}, Carrito: ${carrito}`)
})
router.post('/:cId/product/:pId', (req, res) => {
    const cId = req.params.cId
    const pId = req.params.pId
    let path = './src/routes/cart/Cart.json'
    let newAdd = new CartManager(path);
    newAdd.addToCart(cId, pId)
    res.send(`Se ha agregado el producto`)
})
module.exports = router