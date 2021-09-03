import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

// Controllers
import { createCategory, showCategories, getCategory, deleteCategory, updateCategory, deleteCategories } from "../controllers/categories";

/* Routes = {
    (post '/') => createCategory: "Crear una nueva categoria de productos"
    (get '/') => showCategories: "Mostrar todas las categorias"
    (post '/:id') => getCategory: "Mostrar una categoria de productos por ID"
    (put '/:id') => updateCategory: "Editar una categoria de productos por ID"
    (delete '/:id') => deleteCategory: "Deshabilitar una categoria de producto por ID"
    (delete '/') => deleteCategories: "Deshabilitar todas las categorias"
}
 */

router.get('/', showCategories);

router.get('/:id', getCategory);

router.post('/', [
    check('title').isLength({ min: 3 }),
    check('id_sector').isLength({ min: 3 }),
    check('status').isBoolean()
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        createCategory(req, res);
    }
})

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

router.delete('/', deleteCategories);


export default router;