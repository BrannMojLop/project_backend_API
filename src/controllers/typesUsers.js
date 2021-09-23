const connect = require('../config/database');
const TypeUser = require('../models/TypeUser');
const User = require('../models/User');


async function showTypesUsers(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        if (req.query.name) {
            await TypeUser.find({ name: { $regex: req.query.name, $options: "$i" } }, function (err, typesUsers) {
                if (err) {
                    res.status(401).send(err);
                } else if (typesUsers.length > 0) {
                    res.status(200).send(typesUsers);
                } else {
                    res.status(404).send("No se han encontrado registros");
                }
            })
        } else {
            const typesUsers = await TypeUser.find();
            if (typesUsers.length === 0) {
                res.send("No se han encontrado registros");
            } else {
                res.status(200).send(typesUsers);
            }
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}


async function createTypeUser(req, res) {
    const typeUser = new TypeUser(req.body)

    await connect();
        await typeUser.save(function (err) {
            if (err) {
                res.status(400).json({
                    success: false,
                    type: err.name,
                    error: err.message
                });
            } else {
                res.status(201).json({
                    success: "Tipo de Usuario creado con Exito",
                    typeUser: typeUser
                });
            }
        });
}


async function getTypeUser(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        try {
            const typeUser = await TypeUser.findById(req.params.id);
            if (!typeUser) {
                res.status(204).send("No se han encontrado registros");
            } else {
                res.status(200).send(typeUser);
            }
        } catch (err) {
            res.status(400).send(err)
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function updateTypeUser(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        const typeUser = await TypeUser.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        if (!typeUser) {
            res.status(401).send("No se han encontrado el registro");
        } else {
            await TypeUser.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).send({
                message: 'Tipo de Usuario Actualizado con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function disableTypeUser(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        const typeUser = await TypeUser.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        if (!typeUser) {
            res.status(401).send("No se han encontrado el registro");
        } else {
            await TypeUser.findByIdAndUpdate(req.params.id, {
                "status": false
            });
            res.status(200).send({
                message: 'Tipo de Usuario Deshabilitado con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function disableTypesUsers(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        await TypeUser.updateMany({ "status": false }, function (err, typesUsers) {
            if (err) {
                res.status(401).send("No se han encontrado el registros");
            } else {
                res.status(200).send({
                    message: 'Tipos de Usuarios Deshabilitados con Exito'
                });
            }
        });
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

// exportamos las funciones definidas
module.exports = {
    createTypeUser,
    showTypesUsers,
    getTypeUser,
    disableTypeUser,
    updateTypeUser,
    disableTypesUsers
}
