import { Router } from "express";
const router = Router();

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

router.get('/', showPublications);

router.get('/:id', getPublication);

router.post('/', createPublication);

router.put('/:id', updatePublication);

router.delete('/:id', disablePublication);

router.delete('/', disablePublications);


export default router;