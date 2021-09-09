import { Router } from "express";

const router = Router();

// Controllers
import { createTypeUser, showTypesUsers, getTypeUser, disableTypeUser, updateTypeUser, disableTypesUsers } from "../controllers/typesUsers";

/* Routes = {
    (post '/') => createTypeUser: "Crear un nuevo tipo de usuario"
    (get '/') => showTypeUsers: "Mostrar todos los tipos de usuario existentes"
    (post '/:id') => getTypeUser: "Mostrar un tipo de usuario por ID"
    (put '/:id') => updateTypeUser: "Editar un tipo de usuario por ID"
    (delete '/:id') => deleteTypeUser: "Deshabilitar un tipo de usuario por ID"
    (delete '/') => deleteTypesUsers: "Deshabilitar todos los tipos de usuario existentes"
}
 */

router.get('/', showTypesUsers);

router.get('/:id', getTypeUser);

router.post('/', function (req, res) {
    createTypeUser(req, res);
})

router.put('/:id', updateTypeUser);

router.delete('/:id', disableTypeUser);

router.delete('/', disableTypesUsers);


export default router;