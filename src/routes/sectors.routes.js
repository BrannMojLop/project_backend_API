import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

// Controllers
import { createSector, showSectors, getSector, deleteSector, deleteSectors, updateSector } from "../controllers/sectors";

/* Routes = {
    (post '/') => createSector: "Crear un nuevo sector de productos"
    (get '/') => showSectors: "Mostrar todos los sectores"
    (post '/:id') => getSector: "Mostrar un sector de productos por ID"
    (put '/:id') => updateSector: "Editar un sector de productos por ID"
    (delete '/:id') => deleteSector: "Deshabilitar un sector de producto por ID"
    (delete '/') => deleteSectors: "Deshabilitar todos los sectores"
}
 */

router.get('/', showSectors);

router.get('/:id', getSector);

router.post('/', [
    check('title').isLength({ min: 3 }),
    check('status').isBoolean()
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        createSector(req, res);
    }
})

router.put('/:id', updateSector);

router.delete('/:id', deleteSector);

router.delete('/', deleteSectors);


export default router;