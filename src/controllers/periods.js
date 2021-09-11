const connect = require('../config/database');
const Period = require('../models/Period');


async function showPeriods(req, res) {
    await connect();
    if (req.query.name) {
        await Period.find({ $regex: req.query.name, $options: "$i" }, function (err, periods) {
            if (err) {
                res.status(401).send(err);
            } else if (periods.length > 0) {
                res.status(200).send(periods);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else {
        const periods = await Period.find();
        if (periods.length === 0) {
            res.send("No se han encontrado registros");
        } else {
            res.status(200).send(periods);
        }
    }
}


async function createPeriod(req, res) {
    const period = new Period(req.body)

    await connect();
    await period.save(function (err) {
        if (err) {
            res.status(400).json({
                success: false,
                type: err.name,
                error: err.message
            });
        } else {
            res.status(201).json({
                success: "Periodo creado con Exito",
                Period: period
            });
        }
    });
}


async function getPeriod(req, res) {
    await connect();
    const period = await Period.findById(req.params.id);
    if (!period) {
        res.status(401).send("No se han encontrado registros");
    } else {
        res.status(200).send(period);
    }
}

async function updatePeriod(req, res) {
    await connect();

    const period = await Period.findById(req.params.id);
    if (!period) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await Period.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).send({
            message: 'Periodo Actualizado con Exito'
        });
    }
}

async function disablePeriod(req, res) {
    await connect();

    const period = await Period.findById(req.params.id);
    if (!period) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await Period.findByIdAndUpdate(req.params.id, {
            "status": false
        });
        res.status(200).send({
            message: 'Periodo Deshabilitado con Exito'
        });
    }
}

async function disablePeriods(req, res) {
    await connect();

    await Period.updateMany({ "status": false }, function (err, periods) {
        if (err) {
            res.status(401).send("No se han encontrado el registros");
        } else {
            res.status(200).send({
                message: 'Periodos Deshabilitados con Exito'
            });
        }
    });
}

// exportamos las funciones definidas
module.exports = {
    createPeriod,
    showPeriods,
    getPeriod,
    disablePeriod,
    updatePeriod,
    disablePeriods
}
