import { connect } from "../config/database";
import { ObjectId } from "mongodb";
const User = require('../models/user');


async function showUsers(req, res) {
    const db = await connect();
    const result = await db.collection('users').find({}).toArray();
    if (result.length == 0) {
        res.status(404).send({
            "message": "No se encontraron registros",
        });
    } else {
        res.json(result);
    }
}

async function createUser(req, res) {
    const { firstname, lastname, email, username, password, id_type } = req.body;
    const usuario = new User(firstname, lastname, email, username, password, id_type);
    const db = await connect();
    await db.collection('users').insertOne(usuario);
    res.send({
        message: "Usuario Creado con Exito",
    });
}

async function getUser(req, res) {
    try {
        const db = await connect();
        const result = await db.collection('users').find({
            _id: ObjectId(req.params.id)
        }).toArray();
        res.json(result);
    } catch (err) {
        res.status(404).send({
            "message": "Usuario no encontrado",
        })
    }
}

async function updateUser(req, res) {
    const dataUpdate = {};
    Object.keys(req.body).forEach(atributo => {
        if (atributo !== "create_at" && atributo !== "update_at") {
            dataUpdate[atributo] = req.body[atributo];
        }
    });

    const db = await connect();

    await db.collection("users").updateOne({
        _id: ObjectId(req.params.id)
    }, {
        $set: dataUpdate
    });
    res.send({
        message: 'Usuario Actualizado con Exito'
    });
}

async function deleteUser(req, res) {
    const db = await connect();
    try {
        await db.collection('users').updateOne({
            _id: ObjectId(req.params.id)
        }, {
            $set: {
                "status": false
            }
        });
        res.send({
            "message": `Usuario Eliminado con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Usuario no encontrado",
        })
    }
}

async function deleteUsers(req, res) {
    const db = await connect();
    try {
        await db.collection('users').updateMany({
        }, {
            $set: {
                "status": false
            }
        });
        res.send({
            "message": `Usuarios Eliminados con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Usuarios no Eliminados",
        })
    }
}


// exportamos las funciones definidas
module.exports = {
    createUser,
    showUsers,
    getUser,
    deleteUser,
    updateUser,
    deleteUsers
}
