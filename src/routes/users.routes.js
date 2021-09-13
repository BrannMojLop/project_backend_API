import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createUser, showUsers, getUser, disableUser, updateUser, disableUsers, loginUser } from "../controllers/users";

/* Routes = {
    (post '/') => createUser: "Crear un nuevo usuario"
    (get '/') => showUsers: "Mostrar todos los usuarios existentes"
    (post '/:id') => getUser: "Mostrar un usuario por ID"
    (put '/:id') => updateUser: "Editar un usuario por ID"
    (delete '/:id') => disableUser: "Deshabilitar un usuario por ID"
    (delete '/') => disableUsers: "Deshabilitar todos los usuarios existentes"
}
 */

router.get('/', auth.requerido, showUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.post('/login', loginUser);

router.put('/:id', updateUser);

router.delete('/:id', disableUser);

router.delete('/', disableUsers);


export default router;