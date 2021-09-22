const connect = require('../config/database');
const Product = require('../models/Product');


async function showProducts(req, res) {
    await connect();
    if (req.query.name) {
        await Product.find({ name: { $regex: req.query.name, $options: "$i" } }, function (err, products) {
            if (err) {
                res.status(401).send(err);
            } else if (products.length > 0) {
                res.status(200).send(products);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else if (req.query.id_lessor) {
        await Product.find({ id_lessor: req.query.id_lessor }, function (err, products) {
            if (err) {
                res.status(401).send(err);
            } else if (products.length > 0) {
                res.status(200).send(products);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else if (req.query.id_category) {
        await Product.find({ id_category: req.query.id_category }, function (err, products) {
            if (err) {
                res.status(401).send(err);
            } else if (products.length > 0) {
                res.status(200).send(products);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else {
        const products = await Product.find();
        if (products.length === 0) {
            res.send("No se han encontrado registros");
        } else {
            res.status(200).send(products);
        }
    }
}

async function createProduct(req, res) {
    const product = new Product(req.body)

    await connect();
    await product.save(function (err) {
        if (err) {
            res.status(400).json({
                success: false,
                type: err.title,
                error: err.message
            });
        } else {
            res.status(201).json({
                success: "Producto creado con Exito",
                Product: product
            });
        }
    });
}

async function getProduct(req, res) {
    await connect();
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(401).send("No se han encontrado registros");
    } else {
        res.status(200).send(product);
    }
}

async function updateProduct(req, res) {
    await connect();

    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).send({
            message: 'Producto Actualizado con Exito'
        });
    }
}

async function disableProduct(req, res) {
    await connect();

    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await Product.findByIdAndUpdate(req.params.id, {
            "status": false
        });
        res.status(200).send({
            message: 'Producto Deshabilitado con Exito'
        });
    }
}

async function disableProducts(req, res) {
    await connect();

    await Product.updateMany({ "status": false }, function (err, products) {
        if (err) {
            res.status(401).send("No se han encontrado el registros");
        } else {
            res.status(200).send({
                message: 'Productos Deshabilitados con Exito'
            });
        }
    });
}

// exportamos las funciones definidas
module.exports = {
    createProduct,
    showProducts,
    getProduct,
    disableProduct,
    updateProduct,
    disableProducts
}
