import { connect } from "../config/database";
import { ObjectId } from "mongodb";
const Sector = require('../models/sector');


async function showSectors(req, res) {
    const db = await connect();
    const result = await db.collection('sectors').find({}).toArray();
    if (result.length == 0) {
        res.status(404).send({
            "message": "No se encontraron registros",
        });
    } else {
        res.json(result);
    }
}

async function createSector(req, res) {
    const { title, description, status } = req.body;
    const sector = new Sector(title, description, status);
    const db = await connect();
    await db.collection('sectors').insertOne(sector);
    res.send({
        message: "Sector Creado con Exito",
    });
}

async function getSector(req, res) {
    try {
        const db = await connect();
        const result = await db.collection('sectors').find({
            _id: ObjectId(req.params.id)
        }).toArray();
        res.json(result);
    } catch (err) {
        res.status(404).send({
            "message": "Sector no encontrado",
        })
    }
}

async function updateSector(req, res) {
    const dataUpdate = {};
    Object.keys(req.body).forEach(atributo => {
        dataUpdate[atributo] = req.body[atributo];
        if (atributo === "create_at" || atributo === "update_at") {
            res.status(400);
        }
    });

    const db = await connect();
    db.collection("sectors").updateOne({
        _id: ObjectId(req.params.id)
    },
        {
            $set: dataUpdate
        });

    res.send({
        message: 'Sector Actualizado con Exito'
    });
}

async function deleteSector(req, res) {
    const db = await connect();
    try {
        const result = await db.collection('sectors').findOneAndDelete({
            _id: ObjectId(req.params.id)
        });
        res.send({
            "message": `Sector Eliminado con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Sector no encontrado",
        })
    }
}

async function deleteSectors(req, res) {
    const db = await connect();
    try {
        await db.collection('sectors').remove({});
        res.send({
            "message": `Sectores Eliminados con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Sectores no Eliminados",
        })
    }
}

// exportamos las funciones definidas
module.exports = {
    createSector,
    showSectors,
    getSector,
    deleteSector,
    updateSector,
    deleteSectors
}
