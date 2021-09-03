import { Router } from "express";

const router = Router();

/* Routes = {
    (get '/') => "Muestra vista Home de la API"
}
 */

router.get('/', (req, res) => {
    res.send('Welcome to my new API!');
});


export default router;