import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createSector, showSectors, getSector, updateSector, disableSector, disableSectors } from "../controllers/sectors";

/* Routes = {
    (post '/') => createSector: "Crear un nuevo sector de productos"
    (get '/') => showSectors: "Mostrar todos los sectores"
    (get '/?title') => showSectors: "Mostra sector por titulo"
    (post '/:id') => getSector: "Mostrar un sector de productos por ID"
    (put '/:id') => updateSector: "Editar un sector de productos por ID"
    (delete '/:id') => disableSector: "Deshabilitar un sector de producto por ID"
    (delete '/') => disableSectors: "Deshabilitar todos los sectores"
}
 */

router.get('/', auth.opcional, showSectors);

router.get('/:id', auth.opcional, getSector);

router.post('/', auth.requerido, createSector);

router.put('/:id', auth.requerido, updateSector);

router.delete('/:id', auth.requerido, disableSector);

router.delete('/', auth.requerido, disableSectors);


export default router;