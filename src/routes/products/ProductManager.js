const fs = require("fs");
const uuid4 = require('uuid4')

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }
    addProduct(prodNew) {
        let archive = fs.existsSync(this.path);
        if (!archive) {
            let id = uuid4()
            prodNew["id"] = id;
            prodNew["status"] = true;
            this.products.push(prodNew);
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), "utf-8");
        }
        else {
            let read = fs.readFileSync(this.path, "utf-8");
            let parse = JSON.parse(read);
            let id = uuid4()
            prodNew["id"] = id;
            prodNew["status"] = true;
            parse.push(prodNew);
            fs.writeFileSync(this.path, JSON.stringify(parse, null, 2), "utf-8");
        }
    }
    async upDateProduct(arr, id) {
        try {
            let read = await fs.promises.readFile(this.path, "utf-8");
            let parse = JSON.parse(read);
            let IndexProduct = parse.findIndex((prod) => prod.id == (id.toString()));
            let update = Object.assign({}, parse[IndexProduct], arr);
            parse[IndexProduct] = update;
            await fs.promises.writeFile(this.path, JSON.stringify(parse, null, 2), "utf-8");
            /*console.log(id)
            console.log(update);*/
        }
        catch {
            throw new Error(`Error! no se encontro ese id`);
        }
    }
    async deleteProduct(id) {
        try {
            let read = await fs.promises.readFile(this.path, "utf-8");
            let parse = JSON.parse(read);
            let productoFiltrado = parse.filter((i) => i.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(productoFiltrado, null, 2), "utf-8");
        }
        catch {
            throw new Error(`Error! no se encontro ese id`);
        }
    }
    getProducts() {
        let archive = fs.existsSync(this.path);
        if (!archive) {
            console.log(this.products);
        }
        else {
            let read = fs.readFileSync(this.path, "utf-8");
            let parse = JSON.parse(read);
            return parse
        }
    }
    async getProductById(id) {
        try {
            let read = await fs.promises.readFile(this.path, "utf-8");
            let parse = JSON.parse(read);
            let productoFiltrado = parse.find((prod) => prod.id == id);
            if (productoFiltrado == undefined) {
                throw new Error(`Error! no se encontro ese id`);
            }
            else {
                console.log(productoFiltrado);
            }
        }
        catch {
            throw new Error(`Error! no se encontro ese id`);
        }
    }
}

const productoUno = {
    title: "Dragon Ball 1",
    description: "Manga de Accion",
    price: 1800,
    thumbnail: "Sin imagen",
    code: "q1w2e3",
    stock: 10,
};
const productoDos = {
    title: "Dragon Ball 2",
    description: "Manga de Accion",
    price: 1800,
    thumbnail: "Sin imagen",
    code: "q1w2e3",
    stock: 10,
};
const productoTres = {
    title: "Dragon Ball 3",
    description: "Manga de Accion",
    price: 1800,
    thumbnail: "Sin imagen",
    code: "q1w2e3",
    stock: 10,
};
const productoCuatro = {
    title: "Dragon Ball 4",
    description: "Manga de Accion",
    price: 1800,
    thumbnail: "Sin imagen",
    code: "q1w2e3",
    stock: 10,
};
const productoCinco = {
    title: "Dragon Ball 5",
    description: "Manga de Accion",
    price: 1800,
    thumbnail: "Sin imagen",
    code: "q1w2e3",
    stock: 10,
};
const productoSeis = {
    title: "Dragon Ball 6",
    description: "Manga de Accion",
    price: 1800,
    thumbnail: "Sin imagen",
    code: "q1w2e3",
    stock: 10,
};
const productoSiete = {
    title: "Dragon Ball 7",
    description: "Manga de Accion",
    price: 1800,
    thumbnail: "Sin imagen",
    code: "q1w2e3",
    stock: 10,
};
const productoOcho = {
    title: "Dragon Ball 8",
    description: "Manga de Accion",
    price: 1800,
    thumbnail: "Sin imagen",
    code: "q1w2e3",
    stock: 10,
};
const productoNueve = {
    title: "Dragon Ball 9",
    description: "Manga de Accion",
    price: 1800,
    thumbnail: "Sin imagen",
    code: "q1w2e3",
    stock: 10,
};
const productoDiez = {
    title: "Dragon Ball 10",
    description: "Manga de Accion",
    price: 1800,
    thumbnail: "Sin imagen",
    code: "q1w2e3",
    stock: 10,
};
let product = new ProductManager("./Products.json");
// product.getProducts()
/* product.addProduct(productoUno);
 product.addProduct(productoDos);
 product.addProduct(productoTres);
 product.addProduct(productoCuatro);
 product.addProduct(productoCinco);
 product.addProduct(productoSeis);
 product.addProduct(productoSiete);
 product.addProduct(productoOcho);
 product.addProduct(productoNueve);
 product.addProduct(productoDiez);*/
// product.upDateProduct({title:'Cell',price:800, stock:10, description:'Movil'},41)
// product.getProductById(70)
// product.deleteProduct(7)
module.exports = ProductManager