import { Router } from "express";

const router = Router();

// Controllers
import { createRent, showRents, getRent, disableRent, updateRent, disableRents } from "../controllers/rents";

/* Routes = {
    (post '/') => createRent: "Crear una nueva solicitud de renta"
    (get '/') => showRents: "Mostrar todas las solicitudes de renta"
    (post '/:id') => getRent: "Mostrar una solicitud de renta por ID"
    (put '/:id') => updateRent: "Editar una solicitud de renta por ID"
    (delete '/:id') => disableRent: "Deshabilitar una solicitud de renta por ID"
    (delete '/') => disableRents: "Deshabilitar todas las solicitudes de renta"
}
 */

router.get('/', showRents);

router.get('/:id', getRent);

router.post('/', function (req, res) {
    createRent(req, res);
})

router.put('/:id', updateRent);

router.delete('/:id', disableRent);

router.delete('/', disableRents);


export default router;