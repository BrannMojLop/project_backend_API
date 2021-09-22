import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createCategory, showCategories, getCategory, disableCategory, updateCategory, disableCategories } from "../controllers/categories";

/* Routes = {
    (post '/') => createCategory: "Crear una nueva categoria de productos"
    (get '/') => showCategories: "Mostrar todas las categorias"
    (get '/?title?sector') => showCategories: "Mostrar todas las categorias filtradas"
    (post '/:id') => getCategory: "Mostrar una categoria de productos por ID"
    (put '/:id') => updateCategory: "Editar una categoria de productos por ID"
    (delete '/:id') => disableCategory: "Deshabilitar una categoria de producto por ID"
    (delete '/') => disableCategories: "Deshabilitar todas las categorias"
}
 */

router.get('/', auth.requerido, showCategories);

router.get('/:id', auth.requerido, getCategory);

router.post('/', auth.requerido, createCategory);

router.put('/:id', auth.requerido, updateCategory);

router.delete('/:id', auth.requerido, disableCategory);

router.delete('/', auth.requerido, disableCategories);


export default router;