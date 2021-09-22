import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createPeriod, showPeriods, getPeriod, disablePeriod, updatePeriod, disablePeriods } from "../controllers/periods";

/* Routes = {
    (post '/') => createPeriod: "Crear un nuevo periodo de renta de productos"
    (get '/') => showPeriods: "Mostrar todas los periodos de renta"
    (get '/?title') => showperiods: "Mostrar todos los periodos filtrados"
    (post '/:id') => getPeriod: "Mostrar un periodo de renta de productos por ID"
    (put '/:id') => updatePeriod: "Editar un periodo de renta de productos por ID"
    (delete '/:id') => disablePeriod: "Deshabilitar un periodo de renta de productos por ID"
    (delete '/') => disablePeriods: "Deshabilitar todos los periodos de renta"
}
 */

router.get('/', auth.requerido, showPeriods);

router.get('/:id', auth.requerido, getPeriod);

router.post('/', auth.requerido, createPeriod);

router.put('/:id', auth.requerido, updatePeriod);

router.delete('/:id', auth.requerido, disablePeriod);

router.delete('/', auth.requerido, disablePeriods);


export default router;