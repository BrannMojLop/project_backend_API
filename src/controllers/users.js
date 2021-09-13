const connect = require('../config/database');
const User = require('../models/User');
const passport = require('passport');


async function showUsers(req, res) {
    await connect();
    if (req.query.firstname) {
        await User.find({ firstname: { $regex: req.query.firstname, $options: "$i" } }, function (err, users) {
            if (err) {
                res.status(401).send(err);
            } else if (users.length > 0) {
                res.status(200).send(users);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else if (req.query.lastname) {
        await User.find({ lastname: { $regex: req.query.lastname, $options: "$i" } }, function (err, users) {
            if (err) {
                res.status(401).send(err);
            } else if (users.length > 0) {
                res.status(200).send(users);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else if (req.query.username) {
        await User.find({ username: { $regex: req.query.username, $options: "$i" } }, function (err, users) {
            if (err) {
                res.status(401).send(err);
            } else if (users.length > 0) {
                res.status(200).send(users);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else if (req.query.email) {
        await User.find({ email: { $regex: req.query.email, $options: "$i" } }, function (err, users) {
            if (err) {
                res.status(401).send(err);
            } else if (users.length > 0) {
                res.status(200).send(users);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else {
        const users = await User.find();
        if (users.length === 0) {
            res.send("No se han encontrado registros");
        } else {
            res.status(200).send(users);
        }
    }
}


async function createUser(req, res) {
    const body = req.body,
        password = body.password

    delete body.password
    const user = new User(body)
    user.createPassword(password)

    await connect();
    await user.save(function (err) {
        if (err) {
            res.status(400).json({
                success: false,
                type: err.name,
                error: err.message
            });
        } else {
            res.status(201).json(user.toAuthJSON());
        }
    })
}


function loginUser(req, res, next) {
    if (!req.body.email) {
        return res.status(422).json({ errors: { email: "no puede estar vacío" } });
    }

    if (!req.body.password) {
        return res.status(422).json({ errors: { password: "no puede estar vacío" } });
    }

    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) { return next(err); }

        if (user) {
            user.token = user.generarJWT();
            return res.json({ user: user.toAuthJSON() });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
}


async function getUser(req, res) {
    await connect();
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(401).send("No se han encontrado registros");
    } else {
        res.status(200).send(user);
    }
}

async function updateUser(req, res) {
    await connect();

    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).send({
            message: 'Usuario Actualizado con Exito'
        });
    }
}

async function disableUser(req, res) {
    await connect();

    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(401).send("No se han encontrado el registro");
    } else {
        await User.findByIdAndUpdate(req.params.id, {
            "status": false
        });
        res.status(200).send({
            message: 'Usuario Deshabilitado con Exito'
        });
    }
}

async function disableUsers(req, res) {
    await connect();

    await User.updateMany({ "status": false }, function (err, users) {
        if (err) {
            res.status(401).send("No se han encontrado el registros");
        } else {
            res.status(200).send({
                message: 'Usuarios Deshabilitados con Exito'
            });
        }
    });
}

// exportamos las funciones definidas
module.exports = {
    createUser,
    showUsers,
    getUser,
    disableUser,
    updateUser,
    disableUsers,
    loginUser
}