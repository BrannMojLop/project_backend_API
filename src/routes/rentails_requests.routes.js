import { Router } from "express";

const router = Router();

// Controllers
import { createRentalRequest, showRentalRequests, getRentalRequest, disableRentalRequest, updateRentalRequest, disableRentalRequests } from "../controllers/rentail_requests";

/* Routes = {
    (post '/') => createRentalRequest: "Crear una nueva solicitud de renta"
    (get '/') => showRentalRequests: "Mostrar todas las solicitudes de renta"
    (post '/:id') => getRentalRequest: "Mostrar una solicitud de renta por ID"
    (put '/:id') => updateRentalRequest: "Editar una solicitud de renta por ID"
    (delete '/:id') => disableRentalRequest: "Deshabilitar una solicitud de renta por ID"
    (delete '/') => disableRentalRequests: "Deshabilitar todas las solicitudes de renta"
}
 */

router.get('/', showRentalRequests);

router.get('/:id', getRentalRequest);

router.post('/', function (req, res) {
    createRentalRequest(req, res);
})

router.put('/:id', updateRentalRequest);

router.delete('/:id', disableRentalRequest);

router.delete('/', disableRentalRequests);


export default router;