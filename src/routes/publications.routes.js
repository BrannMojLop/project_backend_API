import { Router } from "express";
const router = Router();
const auth = require('./auth.routes');

// Controllers
import { createPublication, showPublications, getPublication, disablePublication, updatePublication, disablePublications } from "../controllers/publications";

/* Routes = {
    (post '/') => createPublication: "Crear una nueva publicacion de renta"
    (get '/') => showPublications: "Mostrar todas las publicaciones de renta"
    (get '/?title?location?min_price&max_price') => showPublications: "Mostrar todas las publicaciones de renta filtradas"
    (post '/:id') => getPublication: "Mostrar una publicacion de renta por ID"
    (put '/:id') => updatePublication: "Editar una publicacion de renta por ID"
    (delete '/:id') => disablePublication: "Deshabilitar una publicacion de renta por ID"
    (delete '/') => disablePublications: "Deshabilitar todas las publicaciones de renta"
}
 */

router.get('/', auth.opcional, showPublications);

router.get('/:id', auth.opcional, getPublication);

router.post('/', auth.requerido, createPublication);

router.put('/:id', auth.requerido, updatePublication);

router.delete('/:id', auth.requerido, disablePublication);

router.delete('/', auth.requerido, disablePublications);


export default router;