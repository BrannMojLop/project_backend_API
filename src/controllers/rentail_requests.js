const connect = require('../config/database');
const RentalRequest = require('../models/RentalRequest');


async function showRentalRequests(req, res) {
    await connect();
    if (req.query.title) {
        await RentalRequest.find({ title: req.query.title }, function (err, rentalRequests) {
            if (err) {
                res.status(401).send(err);
            } else if (rentalRequests.length > 0) {
                res.status(200).send(rentalRequests);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else {
        const rentalRequests = await RentalRequest.find();
        if (rentalRequests.length === 0) {
            res.send("No se han encontrado registros");
        } else {
            res.status(200).send(rentalRequests);
        }
    }
}


async function createRentalRequest(req, res) {
    const rentalRequest = new RentalRequest(req.body)

    await connect();
    await rentalRequest.save(function (err) {
        if (err) {
            res.status(400).json({
                success: false,
                type: err.title,
                error: err.message
            });
        } else {
            res.status(201).json({
                success: "Solicitud de Renta creada con Exito",
                RentalRequest: rentalRequest
            });
        }
    });
}


async function getRentalRequest(req, res) {
    await connect();
    const rentalRequest = await RentalRequest.findById(req.params.id);
    if (!rentalRequest) {
        res.status(401).send("No se han encontrado registros");
    } else {
        res.status(200).send(rentalRequest);
    }
}

async function updateRentalRequest(req, res) {
    await connect();

    const rentalRequest = await RentalRequest.findById(req.params.id);
    if (!rentalRequest) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await RentalRequest.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).send({
            message: 'Solicitud de Renta Actualizada con Exito'
        });
    }
}

async function disableRentalRequest(req, res) {
    await connect();

    const rentalRequest = await RentalRequest.findById(req.params.id);
    if (!rentalRequest) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await RentalRequest.findByIdAndUpdate(req.params.id, {
            "status": false
        });
        res.status(200).send({
            message: 'Solicitud de Renta Deshabilitada con Exito'
        });
    }
}

async function disableRentalRequests(req, res) {
    await connect();

    await RentalRequest.updateMany({ "status": false }, function (err, rentalRequest) {
        if (err) {
            res.status(401).send("No se han encontrado el registros");
        } else {
            res.status(200).send({
                message: 'Solicitudes de Renta Deshabilitadas con Exito'
            });
        }
    });
}

// exportamos las funciones definidas
module.exports = {
    createRentalRequest,
    showRentalRequests,
    getRentalRequest,
    disableRentalRequest,
    updateRentalRequest,
    disableRentalRequests
}