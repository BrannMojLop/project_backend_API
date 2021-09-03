import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

// Controllers
import { createUser, showUsers, getUser, deleteUser, updateUser, deleteUsers } from "../controllers/users";

/* Routes = {
    (post '/') => createUser: "Crear un nuevo usuario"
    (get '/') => showUsers: "Mostrar todos los usuarios existentes"
    (post '/:id') => getUser: "Mostrar un usuario por ID"
    (put '/:id') => updateUser: "Editar un usuario por ID"
    (delete '/:id') => deleteUser: "Deshabilitar un usuario por ID"
    (delete '/') => deleteUsers: "Deshabilitar todos los usuarios existentes"
}
 */

router.get('/', showUsers);

router.get('/:id', getUser);

router.post('/', [
    check('firstname').isLength({ min: 3 }),
    check('lastname').isLength({ min: 3 }),
    check('email').isEmail(),
    check('username').isLength({ min: 3 }),
    check('password').isLength({ min: 3 }),
    check('id_type').isLength({ min: 3 })
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        createUser(req, res);
    }
})

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.delete('/', deleteUsers);


export default router;