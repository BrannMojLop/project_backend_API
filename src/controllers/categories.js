const connect = require('../config/database');
const Category = require('../models/Category');


async function showCategories(req, res) {
    await connect();
    if (req.query.title) {
        await Category.find({ title: req.query.title }, function (err, categories) {
            if (err) {
                res.status(401).send(err);
            } else if (categories.length > 0) {
                res.status(200).send(categories);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else if (req.query.id_sector) {
        await Category.find({ id_sector: req.query.id_sector }, function (err, requests) {
            if (err) {
                res.status(401).send(err);
            } else if (requests.length > 0) {
                res.status(200).send(requests);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else {
        const categories = await Category.find();
        if (categories.length === 0) {
            res.send("No se han encontrado registros");
        } else {
            res.status(200).send(categories);
        }
    }
}


async function createCategory(req, res) {
    const category = new Category(req.body)

    await connect();
    await category.save(function (err) {
        if (err) {
            res.status(400).json({
                success: false,
                type: err.name,
                error: err.message
            });
        } else {
            res.status(201).json({
                success: "Categoria creada con Exito",
                category: category
            });
        }
    });
}


async function getCategory(req, res) {
    await connect();
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(401).send("No se han encontrado registros");
    } else {
        res.status(200).send(category);
    }
}

async function updateCategory(req, res) {
    await connect();

    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).send({
            message: 'Categoria Actualizada con Exito'
        });
    }
}

async function disableCategory(req, res) {
    await connect();

    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await Category.findByIdAndUpdate(req.params.id, {
            "status": false
        });
        res.status(200).send({
            message: 'Categoria Deshabilitada con Exito'
        });
    }
}

async function disableCategories(req, res) {
    await connect();

    const category = await Category.updateMany({ "status": false }, function (err, categories) {
        if (err) {
            res.status(401).send("No se han encontrado el registros");
        } else {
            res.status(200).send({
                message: 'Categorias Deshabilitados con Exito'
            });
        }
    });
}

// exportamos las funciones definidas
module.exports = {
    createCategory,
    showCategories,
    getCategory,
    disableCategory,
    updateCategory,
    disableCategories
}
