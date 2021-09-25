const connect = require('../config/database');
const RentalRequest = require('../models/RentalRequest');
const Publication = require('../models/Publication');
const User = require('../models/User');
const Product = require('../models/Product');

async function showRentalRequests(req, res) {
    await connect();
    if (req.query.id_lessee) {
        await RentalRequest.find({ id_lessee: req.query.id_lessee }, function (err, requests) {
            if (err) {
                res.status(401).send(err);
            } else if (requests.length > 0) {
                res.status(200).send(requests);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else if (req.query.id_lessor) {
        await RentalRequest.find({ id_lessor: req.query.id_lessor }, function (err, requests) {
            if (err) {
                res.status(401).send(err);
            } else if (requests.length > 0) {
                res.status(200).send(requests);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else if (req.query.id_publication) {
        await RentalRequest.find({ id_publication: req.query.id_publication }, function (err, requests) {
            if (err) {
                res.status(401).send(err);
            } else if (requests.length > 0) {
                res.status(200).send(requests);
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

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 3) {
        const publication = await Publication.findById(rentalRequest.id_publication);
        if (!publication) {
            res.status(401).send("No se ha encontrado el registro de la publicacion");
        } else if (publication.amount == 0) {
            res.status(401).send("El producto no tiene existencias disponibles para renta");
        } else if (publication.status == false) {
            res.status(401).send("La publicacion ya no esta activa");
        } else {
            await rentalRequest.save(async function (err) {
                if (err) {
                    res.status(400).json({
                        success: false,
                        type: err.title,
                        error: err.message
                    });
                } else {
                    if (publication.amount == 1) {
                        await Publication.findByIdAndUpdate(rentalRequest.id_publication, {
                            amount: publication.amount - 1,
                            status: false
                        })
                    } else {
                        await Publication.findByIdAndUpdate(rentalRequest.id_publication, {
                            amount: publication.amount - 1
                        })
                    }
                    res.status(200).json({
                        message: 'Publicacion Actualizada con Exito',
                        success: "Solicitud de Renta creada con Exito",
                        RentalRequest: rentalRequest
                    });
                }
            })
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function getRentalRequest(req, res) {
    await connect();
    try {
        const rentalRequest = await RentalRequest.findById(req.params.id);
        if (!rentalRequest) {
            res.status(204).send("No se han encontrado registros");
        } else {
            res.status(200).send(rentalRequest);
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

async function updateRentalRequest(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 2) {
        const rentalRequest = await RentalRequest.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        const publication = await Publication.findById(rentalRequest.id_publication, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        const product = await Product.findById(publication.id_product);
        if (!rentalRequest) {
            res.status(204).send("No se han encontrado el registro");
        } else if (product.id_lessor != user.id) {
            res.status(401).send("Permisos insuficientes");
        } else {
            if (req.params.answer == 2) {
                await RentalRequest.findByIdAndUpdate(req.params.id, {
                    answer: {
                        "status": "Confirmada",
                        "ref": 2
                    }
                });
            } else if (req.params.answer == 3) {
                await RentalRequest.findByIdAndUpdate(req.params.id, {
                    answer: {
                        "status": "Rechazada",
                        "ref": 3
                    }
                });
            } else if (req.params.answer == 4) {
                await RentalRequest.findByIdAndUpdate(req.params.id, {
                    answer: {
                        "status": "Cancelada",
                        "ref": 4
                    }
                });
            }
            res.status(200).send({
                message: 'Solicitud de Renta Actualizada con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}


// exportamos las funciones definidas
module.exports = {
    createRentalRequest,
    showRentalRequests,
    getRentalRequest,
    updateRentalRequest
}