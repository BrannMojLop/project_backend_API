import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createRentalRequest, showRentalRequests, getRentalRequest, updateRentalRequest } from "../controllers/rentail_requests";

/* Routes = {
    (post '/') => createRentalRequest: "Crear una nueva solicitud de renta"
    (get '/') => showRentalRequests: "Mostrar todas las solicitudes de renta"
    (get '/?id_lessee?id_lessor?id_publication') => showRentalRequests: "Mostrar todas las solicitudes de renta filtradas"
    (post '/:id') => getRentalRequest: "Mostrar una solicitud de renta por ID"
    (put '/:id/:answer') => updateRentalRequest: "Actualizar una solicitud de renta por ID"
}
 */

router.get('/', auth.requerido, showRentalRequests);

router.get('/:id', auth.requerido, getRentalRequest);

router.post('/', auth.requerido, createRentalRequest);

router.put('/:id/:answer', auth.requerido, updateRentalRequest);


export default router;