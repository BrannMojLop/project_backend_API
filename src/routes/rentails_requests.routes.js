import { Router } from "express";

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

router.get('/', showRentalRequests);

router.get('/:id', getRentalRequest);

router.post('/', createRentalRequest);

router.put('/:id/:answer', updateRentalRequest);


export default router;