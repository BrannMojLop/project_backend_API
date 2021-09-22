import { Router } from "express";

const router = Router();
const auth = require('./auth.routes');

// Controllers
import { createRent, showRents, getRent, updateRent } from "../controllers/rents";

/* Routes = {
    (post '/') => createRent: "Crear una nueva solicitud de renta"
    (get '/') => showRents: "Mostrar todas las solicitudes de renta"
    (get '/?id_lessee?id_lessor') => showRents: "Mostrar todas las solicitudes de renta filtradas"
    (post '/:id') => getRent: "Mostrar una solicitud de renta por ID"
    (put '/:id/:update') => updateRent: "Actualizar una solicitud de renta por ID"
}
 */

router.get('/', auth.opcional, showRents);

router.get('/:id', auth.opcional, getRent);

router.post('/', auth.requerido, createRent);

router.put('/:id/:update', auth.requerido, updateRent);


export default router;