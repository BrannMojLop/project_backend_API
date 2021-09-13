import { Router } from "express";

const router = Router();

// Controllers
import { createPeriod, showPeriods, getPeriod, disablePeriod, updatePeriod, disablePeriods } from "../controllers/periods";

/* Routes = {
    (post '/') => createPeriod: "Crear un nuevo periodo de renta de productos"
    (get '/') => showPeriods: "Mostrar todas los periodos de renta"
    (post '/:id') => getPeriod: "Mostrar un periodo de renta de productos por ID"
    (put '/:id') => updatePeriod: "Editar un periodo de renta de productos por ID"
    (delete '/:id') => disablePeriod: "Deshabilitar un periodo de renta de productos por ID"
    (delete '/') => disablePeriods: "Deshabilitar todos los periodos de renta"
}
 */

router.get('/', showPeriods);

router.get('/:id', getPeriod);

router.post('/', createPeriod);

router.put('/:id', updatePeriod);

router.delete('/:id', disablePeriod);

router.delete('/', disablePeriods);


export default router;