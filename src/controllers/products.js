import { connect } from "../config/database";
import { ObjectId } from "mongodb";
const Product = require('../models/products');


async function showProducts(req, res) {
    const db = await connect();
    const result = await db.collection('products').find({}).toArray();
    if (result.length == 0) {
        res.status(404).send({
            "message": "No se encontraron registros",
        });
    } else {
        res.json(result);
    }
}

async function createProduct(req, res) {
    const { title, description, image, id_category, id_arrendador, status } = req.body;
    const product = new Product(title, description, image, id_category, id_arrendador, status);
    const db = await connect();
    await db.collection('products').insertOne(product);
    res.send({
        message: "Producto Creado con Exito",
    });
}

async function getProduct(req, res) {
    try {
        const db = await connect();
        const result = await db.collection('products').find({
            _id: ObjectId(req.params.id)
        }).toArray();
        res.json(result);
    } catch (err) {
        res.status(404).send({
            "message": "Producto no encontrado",
        })
    }
}

async function updateProduct(req, res) {

    const dataUpdate = {};
    Object.keys(req.body).forEach(atributo => {
        if (atributo !== "create_at" && atributo !== "update_at") {
            dataUpdate[atributo] = req.body[atributo];
        }
    });

    const db = await connect();

    await db.collection("products").updateOne({
        _id: ObjectId(req.params.id)
    }, {
        $set: dataUpdate
    });
    res.send({
        message: 'Producto Actualizado con Exito'
    });

}

async function deleteProduct(req, res) {
    const db = await connect();
    try {
        const result = await db.collection('products').findOneAndDelete({
            _id: ObjectId(req.params.id)
        });
        res.send({
            "message": `Producto Eliminado con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Producto no encontrado",
        })
    }
}

async function deleteProducts(req, res) {
    const db = await connect();
    try {
        await db.collection('products').remove({});
        res.send({
            "message": `Productos Eliminados con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Productos no Eliminados",
        })
    }
}

// exportamos las funciones definidas
module.exports = {
    createProduct,
    showProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    deleteProducts
}
