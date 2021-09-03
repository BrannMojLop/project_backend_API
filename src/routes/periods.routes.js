import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

// Controllers
import { createPeriod, showPeriods, getPeriod, deletePeriod, updatePeriod, deletePeriods } from "../controllers/periods";

/* Routes = {
    (post '/') => createPeriod: "Crear un nuevo periodo de renta de productos"
    (get '/') => showPeriods: "Mostrar todas los periodos de renta"
    (post '/:id') => getPeriod: "Mostrar un periodo de renta de productos por ID"
    (put '/:id') => updatePeriod: "Editar un periodo de renta de productos por ID"
    (delete '/:id') => deletePeriod: "Deshabilitar un periodo de renta de productos por ID"
    (delete '/') => deletePeriods: "Deshabilitar todos los periodos de renta"
}
 */

router.get('/', showPeriods);

router.get('/:id', getPeriod);

router.post('/', [
    check('name').isLength({ min: 3 }),
    check('days').isNumeric()
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        createPeriod(req, res);
    }
})

router.put('/:id', updatePeriod);

router.delete('/:id', deletePeriod);

router.delete('/', deletePeriods);


export default router;