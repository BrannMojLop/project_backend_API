import { connect } from "../config/database";
import { ObjectId } from "mongodb";
const Publication = require('../models/publication');


async function showPublications(req, res) {
    const db = await connect();
    const result = await db.collection('publications').find({}).toArray();
    if (result.length == 0) {
        res.status(404).send({
            "message": "No se encontraron registros",
        });
    } else {
        res.json(result);
    }
}

async function createPublication(req, res) {
    const { id_product, prices, date_finished, status } = req.body;
    const publication = new Publication(id_product, prices, date_finished, status);
    const db = await connect();
    await db.collection('publications').insertOne(publication);
    res.send({
        message: "Publicaciòn Creada con Exito",
    });
}

async function getPublication(req, res) {
    try {
        const db = await connect();
        const result = await db.collection('publications').find({
            _id: ObjectId(req.params.id)
        }).toArray();
        res.json(result);
    } catch (err) {
        res.status(404).send({
            "message": "Publicaciòn no encontrada",
        })
    }
}

async function updatePublication(req, res) {
    const dataUpdate = {};
    Object.keys(req.body).forEach(atributo => {
        if (atributo !== "create_at" && atributo !== "update_at") {
            if (atributo === "finished_at") {
                dataUpdate[atributo] = new Date(req.body[atributo].year, req.body[atributo].month, req.body[atributo].day);
            } else {
                dataUpdate[atributo] = req.body[atributo];
            }
        }
    });

    const db = await connect();

    await db.collection("publications").updateOne({
        _id: ObjectId(req.params.id)
    }, {
        $set: dataUpdate
    });
    res.send({
        message: 'Publicación Actualizada con Exito'
    });
}

async function deletePublication(req, res) {
    const db = await connect();
    try {
        await db.collection('publications').findOneAndDelete({
            _id: ObjectId(req.params.id)
        });
        res.send({
            "message": `Publicaciòn Eliminada con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Publicaciòn no encontrada",
        })
    }
}

async function deletePublications(req, res) {
    const db = await connect();
    try {
        await db.collection('publications').remove({});
        res.send({
            "message": `Publicaciones Eliminados con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Publicaciones no Eliminados",
        })
    }
}

// exportamos las funciones definidas
module.exports = {
    createPublication,
    showPublications,
    getPublication,
    deletePublication,
    updatePublication,
    deletePublications
}
