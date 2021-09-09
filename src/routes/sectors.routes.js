import { Router } from "express";

const router = Router();

// Controllers
import { createSector, showSectors, getSector, updateSector, disableSector, disableSectors } from "../controllers/sectors";

/* Routes = {
    (post '/') => createSector: "Crear un nuevo sector de productos"
    (get '/') => showSectors: "Mostrar todos los sectores"
    (get '/?title') => showSectors: "Mostra sector por titulo"
    (post '/:id') => getSector: "Mostrar un sector de productos por ID"
    (put '/:id') => updateSector: "Editar un sector de productos por ID"
    (delete '/:id') => deleteSector: "Deshabilitar un sector de producto por ID"
    (delete '/') => deleteSectors: "Deshabilitar todos los sectores"
}
 */

router.get('/', showSectors);

router.get('/:id', getSector);

router.post('/', function (req, res) {
    createSector(req, res);
})

router.put('/:id', updateSector);

router.delete('/:id', disableSector);

router.delete('/', disableSectors);


export default router;