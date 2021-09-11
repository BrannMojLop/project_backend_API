import { Router } from "express";

const router = Router();

// Controllers
import { createRentalRequest, showRentalRequests, getRentalRequest, updateRentalRequest } from "../controllers/rentail_requests";

/* Routes = {
    (post '/') => createRentalRequest: "Crear una nueva solicitud de renta"
    (get '/') => showRentalRequests: "Mostrar todas las solicitudes de renta"
    (post '/:id') => getRentalRequest: "Mostrar una solicitud de renta por ID"
    (put '/:id') => updateRentalRequest: "Actualizar una solicitud de renta por ID"
}
 */

router.get('/', showRentalRequests);

router.get('/:id', getRentalRequest);

router.post('/', function (req, res) {
    createRentalRequest(req, res);
})

router.put('/:id/:answer', updateRentalRequest);


export default router;