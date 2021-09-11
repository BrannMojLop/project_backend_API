const connect = require('../config/database');
const Rent = require('../models/Rent');


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
    await rent.save(function (err) {
        if (err) {
            res.status(400).json({
                success: false,
                type: err.title,
                error: err.message
            });
        } else {
            res.status(201).json({
                success: "Renta creada con Exito",
                Rent: rent
            });
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
        await Rent.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).send({
            message: 'Renta Actualizada con Exito'
        });
    }
}

async function disableRent(req, res) {
    await connect();

    const rent = await Rent.findById(req.params.id);
    if (!rent) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await Rent.findByIdAndUpdate(req.params.id, {
            "status": false
        });
        res.status(200).send({
            message: 'Renta Deshabilitada con Exito'
        });
    }
}

async function disableRents(req, res) {
    await connect();

    await Rent.updateMany({ "status": false }, function (err, rents) {
        if (err) {
            res.status(401).send("No se han encontrado el registros");
        } else {
            res.status(200).send({
                message: 'Rentas Deshabilitadas con Exito'
            });
        }
    });
}

// exportamos las funciones definidas
module.exports = {
    createRent,
    showRents,
    getRent,
    disableRent,
    updateRent,
    disableRents
}