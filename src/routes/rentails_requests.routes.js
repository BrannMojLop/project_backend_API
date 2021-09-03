import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

// Controllers
import { createRequest, showRequests, getRequest, deleteRequest, updateRequest, deleteRequests } from "../controllers/rentail_requests";

/* Routes = {
    (post '/') => createRequest: "Crear una nueva solicitud de renta"
    (get '/') => showRequests: "Mostrar todas las solicitudes de renta"
    (post '/:id') => getRequest: "Mostrar una solicitud de renta por ID"
    (put '/:id') => updateRequest: "Editar una solicitud de renta por ID"
    (delete '/:id') => deleteRequest: "Deshabilitar una solicitud de renta por ID"
    (delete '/') => deleteRequests: "Deshabilitar todas las solicitudes de renta"
}
 */

router.get('/', showRequests);

router.get('/:id', getRequest);

router.post('/', [
    check('id_lessee').isLength({ min: 3 }),
    check('id_solicitud').isLength({ min: 3 }),
    check('status').isBoolean()
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        createRequest(req, res);
    }
})

router.put('/:id', updateRequest);

router.delete('/:id', deleteRequest);

router.delete('/', deleteRequests);


export default router;