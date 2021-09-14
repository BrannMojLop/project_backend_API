import { Router } from "express";

const router = Router();

// Controllers
import { createTypeUser, showTypesUsers, getTypeUser, disableTypeUser, updateTypeUser, disableTypesUsers } from "../controllers/typesUsers";

/* Routes = {
    (post '/') => createTypeUser: "Crear un nuevo tipo de usuario"
    (get '/') => showTypeUsers: "Mostrar todos los tipos de usuario existentes"
    (get '/?name') => showTypeUsers: "Mostrar todos los tipos de usuario filtrados"
    (post '/:id') => getTypeUser: "Mostrar un tipo de usuario por ID"
    (put '/:id') => updateTypeUser: "Editar un tipo de usuario por ID"
    (delete '/:id') => disableTypeUser: "Deshabilitar un tipo de usuario por ID"
    (delete '/') => disableTypesUsers: "Deshabilitar todos los tipos de usuario existentes"
}
 */

router.get('/', showTypesUsers);

router.get('/:id', getTypeUser);

router.post('/', createTypeUser);

router.put('/:id', updateTypeUser);

router.delete('/:id', disableTypeUser);

router.delete('/', disableTypesUsers);


export default router;