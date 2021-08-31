import { connect } from "../config/database";
import { ObjectId } from "mongodb";
const Period = require('../models/period');


async function showPeriods(req, res) {
    const db = await connect();
    const result = await db.collection('periods').find({}).toArray();
    if (result.length == 0) {
        res.status(404).send({
            "message": "No se encontraron registros",
        });
    } else {
        res.json(result);
    }
}

async function createPeriod(req, res) {
    const { name, days } = req.body;
    const period = new Period(name, days);
    const db = await connect();
    await db.collection('periods').insertOne(period);
    res.send({
        message: "Periodo Creado con Exito",
    });
}

async function getPeriod(req, res) {
    try {
        const db = await connect();
        const result = await db.collection('periods').find({
            _id: ObjectId(req.params.id)
        }).toArray();
        res.json(result);
    } catch (err) {
        res.status(404).send({
            "message": "Periodo no encontrado",
        })
    }
}

async function updatePeriod(req, res) {
    const dataUpdate = {};
    Object.keys(req.body).forEach(atributo => {
        dataUpdate[atributo] = req.body[atributo];
        if (atributo === "create_at" || atributo === "update_at") {
            res.status(400);
        }
    });
    const db = await connect();

    await db.collection("periods").updateOne({
        _id: ObjectId(req.params.id)
    }, {
        $set: dataUpdate
    });
    res.send({
        message: 'Periodo Actualizado con Exito'
    });
}

async function deletePeriod(req, res) {
    const db = await connect();
    try {
        await db.collection('periods').findOneAndDelete({
            _id: ObjectId(req.params.id)
        });
        res.send({
            "message": `Periodo Eliminado con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Periodo no encontrado",
        })
    }
}

async function deletePeriods(req, res) {
    const db = await connect();
    try {
        await db.collection('periods').remove({});
        res.send({
            "message": `Periodos Eliminados con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Periodos no Eliminados",
        })
    }
}

// exportamos las funciones definidas
module.exports = {
    createPeriod,
    showPeriods,
    getPeriod,
    deletePeriod,
    updatePeriod,
    deletePeriods
}
