import { Router } from "express";

const router = Router();

// Controllers
import { createUser, showUsers, getUser, disableUser, updateUser, disableUsers } from "../controllers/users";

/* Routes = {
    (post '/') => createUser: "Crear un nuevo usuario"
    (get '/') => showUsers: "Mostrar todos los usuarios existentes"
    (post '/:id') => getUser: "Mostrar un usuario por ID"
    (put '/:id') => updateUser: "Editar un usuario por ID"
    (delete '/:id') => disableUser: "Deshabilitar un usuario por ID"
    (delete '/') => disableUsers: "Deshabilitar todos los usuarios existentes"
}
 */

router.get('/', showUsers);

router.get('/:id', getUser);

router.post('/', function (req, res) {
    createUser(req, res);
})

router.put('/:id', updateUser);

router.delete('/:id', disableUser);

router.delete('/', disableUsers);


export default router;