import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createUser, showUsers, getUser, disableUser, updateUser, disableUsers, login } from "../controllers/users";

/* Routes = {
    (post '/') => createUser: "Crear un nuevo usuario"
    (get '/') => showUsers: "Mostrar todos los usuarios existentes"
    (get '/?firstname?lastname?email?username') => showUsers: "Mostrar todos los usuarios filtrados"
    (post '/:id') => getUser: "Mostrar un usuario por ID"
    (put '/:id') => updateUser: "Editar un usuario por ID"
    (delete '/:id') => disableUser: "Deshabilitar un usuario por ID"
    (delete '/') => disableUsers: "Deshabilitar todos los usuarios existentes"
}
 */

router.get('/', auth.requerido, showUsers);

router.get('/:id', auth.requerido, getUser);

router.post('/', auth.opcional, createUser);

router.post('/login', login);

router.put('/:id', auth.requerido, updateUser);

router.delete('/:id', auth.requerido, disableUser);

router.delete('/', auth.requerido, disableUsers);


export default router;