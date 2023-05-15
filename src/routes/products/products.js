const ProductManager = require('./ProductManager')
const express = require('express')
const { Router } = express
const router = new Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/:pId', (req, res) => {
    const pId = req.params.pId
    let product = new ProductManager("./src/routes/products/Products.json");
    let products = product.getProducts()
    let prodFiltrado = products.find((p) => String(p.id) == pId)
    if (!prodFiltrado) {
        res.send(`ERROR!: Producto no encontrado`)
    }
    else {
        res.send(`
            <div><p>${prodFiltrado.id}</p></div>
            <div><p>${prodFiltrado.title}</p></div>
            <div><p>${prodFiltrado.description}</p></div>
            <div><p>$ ${prodFiltrado.price}</p></div>
            <div><p>${prodFiltrado.thumbnail}</p></div>
            <div><p>${prodFiltrado.stock}</p></div>
            <div><p>${prodFiltrado.code}</p></div>
        `)
    }
})
router.get('/', (req, res) => {
    let product = new ProductManager("./src/routes/products/Products.json");
    let products = product.getProducts()
    console.log(products)
    let { limit } = req.query;
    let intLimit = parseInt(limit)
    if (!intLimit) {
        res.send(products)
    }
    else {
        prod = []
        for (let i = 0; i < intLimit; i++) {
            prod.push(products[i])
        }
        res.send(prod)
    }
})
router.post('/', (req, res) => {
    let data = req.body
    let product = new ProductManager("./src/routes/products/Products.json");
    let newProduct = product.addProduct(data)
    res.send(data)

})
router.put('/:pId', (req, res) => {
    const pId = req.params.pId
    const data = req.body
    let product = new ProductManager("./src/routes/products/Products.json");
    product.upDateProduct(data, pId)
    res.send('Update aplicado')
})
router.delete('/:pId', (req, res) => {
    let pId = req.params.pId
    let product = new ProductManager("./src/routes/products/Products.json");
    product.deleteProduct(pId)
    res.send('Delete aplicado')
})
module.exports = router