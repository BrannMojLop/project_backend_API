import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

// Controllers
import { createTypeUser, showTypeUsers, getTypeUser, deleteTypeUser, updateTypeUser, deleteTypesUsers } from "../controllers/typeUser";

/* Routes = {
    (post '/') => createTypeUser: "Crear un nuevo tipo de usuario"
    (get '/') => showTypeUsers: "Mostrar todos los tipos de usuario existentes"
    (post '/:id') => getTypeUser: "Mostrar un tipo de usuario por ID"
    (put '/:id') => updateTypeUser: "Editar un tipo de usuario por ID"
    (delete '/:id') => deleteTypeUser: "Deshabilitar un tipo de usuario por ID"
    (delete '/') => deleteTypesUsers: "Deshabilitar todos los tipos de usuario existentes"
}
 */

router.get('/', showTypeUsers);

router.get('/:id', getTypeUser);

router.post('/', [
    check('name').isLength({ min: 3 }),
    check('type').isNumeric()
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        createTypeUser(req, res);
    }
})

router.put('/:id', updateTypeUser);

router.delete('/:id', deleteTypeUser);

router.delete('/', deleteTypesUsers);


export default router;