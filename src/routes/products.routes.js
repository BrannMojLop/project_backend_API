import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createProduct, showProducts, getProduct, disableProduct, updateProduct, disableProducts } from "../controllers/products";

/* Routes = {
    (post '/') => createProduct: "Crear un nuevo producto"
    (get '/') => showProducts: "Mostrar todos los productos existentes"
    (get '/?title?id_lessor?id_category') => showproducts: "Mostrar todos los productos filtrados"
    (post '/:id') => getProduct: "Mostrar un producto por ID"
    (put '/:id') => updateProduct: "Editar un producto por ID"
    (delete '/:id') => disableProduct: "Deshabilitar un producto por ID"
    (delete '/') => disableProducts: "Deshabilitar todos los productos existentes"
}
 */

router.get('/', auth.requerido, showProducts);

router.get('/:id', auth.requerido, getProduct);

router.post('/', auth.requerido, createProduct);

router.put('/:id', auth.requerido, updateProduct);

router.delete('/:id', auth.requerido, disableProduct);

router.delete('/', auth.requerido, disableProducts);


export default router;