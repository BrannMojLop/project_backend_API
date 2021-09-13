import { Router } from "express";

const router = Router();

// Controllers
import { createCategory, showCategories, getCategory, disableCategory, updateCategory, disableCategories } from "../controllers/categories";

/* Routes = {
    (post '/') => createCategory: "Crear una nueva categoria de productos"
    (get '/') => showCategories: "Mostrar todas las categorias"
    (post '/:id') => getCategory: "Mostrar una categoria de productos por ID"
    (put '/:id') => updateCategory: "Editar una categoria de productos por ID"
    (delete '/:id') => disableCategory: "Deshabilitar una categoria de producto por ID"
    (delete '/') => disableCategories: "Deshabilitar todas las categorias"
}
 */

router.get('/', showCategories);

router.get('/:id', getCategory);

router.post('/', createCategory);

router.put('/:id', updateCategory);

router.delete('/:id', disableCategory);

router.delete('/', disableCategories);


export default router;