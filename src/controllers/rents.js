const connect = require('../config/database');
const Rent = require('../models/Rent');
const RentalRequest = require('../models/RentalRequest');


async function showRents(req, res) {
    await connect();
    if (req.query.id_lessee) {
        await Rent.aggregate([
            {
                '$lookup': {
                    'from': 'rentalrequests',
                    'localField': 'id_rentalRequest',
                    'foreignField': '_id',
                    'as': 'request'
                }
            }, { '$unwind': '$request' }
        ], function (err, rents) {
            if (err) {
                res.status(401).res.send(err);
            }
            else if (rents.length === 0) {
                res.send("No se han encontrado registros");
            } else {
                const result = [];
                rents.forEach(rent => {
                    if (rent.request.id_lessee == req.query.id_lessee) {
                        result.push(rent)
                    }
                });
                res.status(200).send(result);
            }
        }
        )
    } else if (req.query.id_lessor) {
        await Rent.aggregate([
            {
                '$lookup': {
                    'from': 'rentalrequests',
                    'localField': 'id_rentalRequest',
                    'foreignField': '_id',
                    'as': 'request'
                }
            }, { '$unwind': '$request' }
        ], function (err, rents) {
            if (err) {
                res.status(401).res.send(err);
            }
            else if (rents.length === 0) {
                res.send("No se han encontrado registros");
            } else {
                const result = [];
                rents.forEach(rent => {
                    if (rent.request.id_lessor == req.query.id_lessor) {
                        result.push(rent)
                    }
                });
                res.status(200).send(result);
            }
        }
        )
    } else {
        await Rent.aggregate([
            {
                '$lookup': {
                    'from': 'rentalrequests',
                    'localField': 'id_rentalRequest',
                    'foreignField': '_id',
                    'as': 'request'
                }
            }, { '$unwind': '$request' }], function (err, rents) {
                if (err) {
                    res.status(401).res.send(err);
                }
                else if (rents.length === 0) {
                    res.send("No se han encontrado registros");
                } else {
                    res.status(200).send(rents);
                }
            }
        )
    }
}

async function createRent(req, res) {
    const rent = new Rent(req.body)

    await connect();
    await rent.save(async function (err) {
        if (err) {
            res.status(400).json({
                success: false,
                type: err.title,
                error: err.message
            });
        } else {
            const rentalRequest = await RentalRequest.findById(rent.id_rentalRequest);
            if (!rentalRequest) {
                res.status(401).send("No se ha encontrado el registro de la solicitud de renta");
            } else {
                await RentalRequest.findByIdAndUpdate(rent.id_rentalRequest, {
                    answer: {
                        "status": "Confirmada",
                        "ref": 2
                    }
                });
                res.status(200).json({
                    message: 'Solicitud de Renta Actualizada con Exito',
                    success: "Renta creada con Exito",
                    RentalRequest: rentalRequest
                });
            }
        }
    });
}

async function getRent(req, res) {
    await connect();
    const rent = await Rent.findById(req.params.id);
    if (!rent) {
        res.status(401).send("No se han encontrado registros");
    } else {
        res.status(200).send(rent);
    }
}

async function updateRent(req, res) {
    await connect();

    const rent = await Rent.findById(req.params.id);
    if (!rent) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        if (req.params.update == 2) {
            await Rent.findByIdAndUpdate(req.params.id, {
                status: {
                    "status": "Finalizada",
                    "ref": 2
                }
            });
        } else if (req.params.update == 3) {
            await Rent.findByIdAndUpdate(req.params.id, {
                status: {
                    "status": "Cancelada",
                    "ref": 2
                }
            });
        } else if (req.params.update == 4) {
            await Rent.findByIdAndUpdate(req.params.id, {
                payment: true
            });
        }
        res.status(200).json({
            message: 'Solicitud de Renta Actualizada con Exito'
        });
    }
}

// exportamos las funciones definidas
module.exports = {
    createRent,
    showRents,
    getRent,
    updateRent
}