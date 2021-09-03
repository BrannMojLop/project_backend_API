import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

// Controllers
import { createPublication, showPublications, getPublication, deletePublication, updatePublication, deletePublications } from "../controllers/publications";

/* Routes = {
    (post '/') => createPublication: "Crear una nueva publicacion de renta"
    (get '/') => showPublications: "Mostrar todas las publicaciones de renta"
    (post '/:id') => getPublication: "Mostrar una publicacion de renta por ID"
    (put '/:id') => updatePublication: "Editar una publicacion de renta por ID"
    (delete '/:id') => deletePublication: "Deshabilitar una publicacion de renta por ID"
    (delete '/') => deletePublications: "Deshabilitar todas las publicaciones de renta"
}
 */

router.get('/', showPublications);

router.get('/:id', getPublication);

router.post('/', [
    check('id_product').isLength({ min: 3 }),
    check('prices').isObject(),
    check('prices').isNumeric(),
    check('location').isLength({ min: 3 }),
    check('max_distance').isLength({ min: 3 }),
    check('date_finished').isObject(),
    check('status').isBoolean()
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        createPublication(req, res);
    }
})

router.put('/:id', updatePublication);

router.delete('/:id', deletePublication);

router.delete('/', deletePublications);


export default router;