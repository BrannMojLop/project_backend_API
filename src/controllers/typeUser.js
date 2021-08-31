import { connect } from "../config/database";
import { ObjectId } from "mongodb";
const TypeUser = require('../models/typeUser');


async function showTypeUsers(req, res) {
    const db = await connect();
    const result = await db.collection('typeUser').find({}).toArray();
    if (result.length == 0) {
        res.status(404).send({
            "message": "No se encontraron registros",
        });
    } else {
        res.json(result);
    }
}

async function createTypeUser(req, res) {
    const { name, type } = req.body;
    const typeUser = new TypeUser(name, type);
    const db = await connect();
    await db.collection('typeUser').insertOne(typeUser);
    res.send({
        message: "Tipo de Usuario Creado con Exito",
    });
}

async function getTypeUser(req, res) {
    try {
        const db = await connect();
        const result = await db.collection('typeUser').find({
            _id: ObjectId(req.params.id)
        }).toArray();
        res.json(result);
    } catch (err) {
        res.status(404).send({
            "message": "Tipo de Usuario no encontrado",
        })
    }
}

async function updateTypeUser(req, res) {
    const dataUpdate = {};
    Object.keys(req.body).forEach(atributo => {
        dataUpdate[atributo] = req.body[atributo];
        if (atributo === "create_at" || atributo === "update_at") {
            res.status(400);
        }
    });
    const db = await connect();

    await db.collection("typeUser").updateOne({
        _id: ObjectId(req.params.id)
    }, {
        $set: dataUpdate
    });
    res.send({
        message: 'Tipo de Usuario Actualizado con Exito'
    });
}

async function deleteTypeUser(req, res) {
    const db = await connect();
    try {
        await db.collection('typeUser').findOneAndDelete({
            _id: ObjectId(req.params.id)
        });
        res.send({
            "message": `Tipo de Usuario Eliminado con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Tipo de Usuario no encontrado",
        })
    }
}

async function deleteTypesUsers(req, res) {
    const db = await connect();
    try {
        await db.collection('typeUser').remove({});
        res.send({
            "message": `Tipos de Usuario Eliminados con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Tipos de Usuario no Eliminados",
        })
    }
}

// exportamos las funciones definidas
module.exports = {
    createTypeUser,
    showTypeUsers,
    getTypeUser,
    deleteTypeUser,
    updateTypeUser,
    deleteTypesUsers
}
