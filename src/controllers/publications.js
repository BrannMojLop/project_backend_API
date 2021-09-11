const connect = require('../config/database');
const Publication = require('../models/Publication');


async function showPublications(req, res) {
    await connect();
    if (req.query.title) {
        await Publication.find({ title: req.query.title }, function (err, publications) {
            if (err) {
                res.status(401).send(err);
            } else if (publications.length > 0) {
                res.status(200).send(publications);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else {
        const publications = await Publication.find();
        if (publications.length === 0) {
            res.send("No se han encontrado registros");
        } else {
            res.status(200).send(publications);
        }
    }
}


async function createPublication(req, res) {
    const publication = new Publication(req.body)

    await connect();
    await publication.save(function (err) {
        if (err) {
            res.status(400).json({
                success: false,
                type: err.title,
                error: err.message
            });
        } else {
            res.status(201).json({
                success: "Publicacion creada con Exito",
                Publication: publication
            });
        }
    });
}


async function getPublication(req, res) {
    await connect();
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
        res.status(401).send("No se han encontrado registros");
    } else {
        res.status(200).send(publication);
    }
}

async function updatePublication(req, res) {
    await connect();

    const publication = await Publication.findById(req.params.id);
    if (!publication) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await Publication.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).send({
            message: 'Publicacion Actualizada con Exito'
        });
    }
}

async function disablePublication(req, res) {
    await connect();

    const publication = await Publication.findById(req.params.id);
    if (!publication) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await Publication.findByIdAndUpdate(req.params.id, {
            "status": false
        });
        res.status(200).send({
            message: 'Publicacion Deshabilitada con Exito'
        });
    }
}

async function disablePublications(req, res) {
    await connect();

    await Publication.updateMany({ "status": false }, function (err, publications) {
        if (err) {
            res.status(401).send("No se han encontrado el registros");
        } else {
            res.status(200).send({
                message: 'Publicaciones Deshabilitadas con Exito'
            });
        }
    });
}

// exportamos las funciones definidas
module.exports = {
    createPublication,
    showPublications,
    getPublication,
    disablePublication,
    updatePublication,
    disablePublications
}