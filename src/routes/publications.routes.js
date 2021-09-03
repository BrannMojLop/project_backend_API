import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

// Controllers
import { createPublication, showPublications, getPublication, deletePublication, updatePublication, deletePublications } from "../controllers/publications";

// Routes
router.get('/', showPublications);

router.get('/:id', getPublication);

router.post('/', [
    check('id_product').isLength({ min: 3 }),
    check('prices').isObject(),
    check('date_finished').isObject(),
    check('status').isBoolean()
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        createPublication(req, res);
    }
})

router.put('/:id', updatePublication);

router.delete('/:id', deletePublication);

router.delete('/:id', deletePublications);


export default router;