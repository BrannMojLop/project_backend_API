import { connect } from "../config/database";
import { ObjectId } from "mongodb";
const Rental_Request = require('../models/rental_request');


async function showRequests(req, res) {
    const db = await connect();
    const result = await db.collection('rental_requests').find({}).toArray();
    if (result.length == 0) {
        res.status(404).send({
            "message": "No se encontraron registros",
        });
    } else {
        res.json(result);
    }
}

async function createRequest(req, res) {
    const { id_lessee, id_publicacion, answer, status } = req.body;
    const request = new Rental_Request(id_lessee, id_publicacion, answer, status);
    const db = await connect();
    await db.collection('rental_requests').insertOne(request);
    res.send({
        message: "Solicitud de Renta Creada con Exito",
    });
}

async function getRequest(req, res) {
    try {
        const db = await connect();
        const result = await db.collection('rental_requests').find({
            _id: ObjectId(req.params.id)
        }).toArray();
        res.json(result);
    } catch (err) {
        res.status(404).send({
            "message": "Solicitud de Renta no encontrada",
        })
    }
}

async function updateRequest(req, res) {

    try {
        const dataUpdateRequest = {};
        const dataUpdatePublication = {};
        const db = await connect();

        if (req.body.answer === true) {
            dataUpdateRequest["status"] = false;
            dataUpdateRequest["answer"] = true;

            const request = await db.collection("rental_requests").findOne({
                _id: ObjectId(req.params.id)
            })

            const publication = await db.collection("publications").findOne({
                _id: ObjectId(request.id_publicacion)
            })

            if (publication.amount <= 1) {
                dataUpdatePublication["amount"] = publication.amount - 1;
                dataUpdatePublication["status"] = false;
            } else {
                dataUpdatePublication["amount"] = publication.amount - 1;
            }

            await db.collection("publications").updateOne({
                _id: publication._id
            }, {
                $set: dataUpdatePublication
            });

        } else {
            dataUpdate["status"] = false;
            dataUpdate["answer"] = false;
        }

        await db.collection("rental_requests").updateOne({
            _id: ObjectId(req.params.id)
        }, {
            $set: dataUpdateRequest
        });

        res.send({
            message: 'Solicitud de Renta Actualizada con Exito'
        });
    } catch (err) {
        res.status(404).send({
            "message": "Solicitud de Renta no actualizada",
        })
    }


}

async function deleteRequest(req, res) {
    const db = await connect();
    try {
        await db.collection('rental_requests').updateOne({
            _id: ObjectId(req.params.id)
        }, {
            $set: {
                "status": false
            }
        });
        res.send({
            "message": `Solicitud de Renta Eliminada con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Solicitud de Renta no encontrada",
        })
    }
}

async function deleteRequests(req, res) {
    const db = await connect();
    try {
        await db.collection('rental_requests').updateMany({
        }, {
            $set: {
                "status": false
            }
        });
        res.send({
            "message": `Solicitudes de Rentas Eliminadas con Exito`
        });
    } catch (err) {
        res.status(404).send({
            "message": "Solicitudes de Rentas no Eliminadas",
        })
    }
}

// exportamos las funciones definidas
module.exports = {
    createRequest,
    showRequests,
    getRequest,
    deleteRequest,
    updateRequest,
    deleteRequests
}
