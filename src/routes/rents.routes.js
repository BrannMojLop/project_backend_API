import { Router } from "express";

const router = Router();

// Controllers
import { createRent, showRents, getRent, updateRent } from "../controllers/rents";

/* Routes = {
    (post '/') => createRent: "Crear una nueva solicitud de renta"
    (get '/') => showRents: "Mostrar todas las solicitudes de renta"
    (post '/:id') => getRent: "Mostrar una solicitud de renta por ID"
    (put '/:id') => updateRent: "Actualizar una solicitud de renta por ID"
}
 */

router.get('/', showRents);

router.get('/:id', getRent);

router.post('/', function (req, res) {
    createRent(req, res);
})

router.put('/:id/:update', updateRent);


export default router;