const connect = require('../config/database');
const Rent = require('../models/Rent');
const RentalRequest = require('../models/RentalRequest');


async function showRents(req, res) {
    await connect();
    const rents = await Rent.find();
    if (rents.length === 0) {
        res.send("No se han encontrado registros");
    } else {
        res.status(200).send(rents);
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