import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

// Controllers
import { createProduct, showProducts, getProduct, deleteProduct, updateProduct, deleteProducts } from "../controllers/products";

// Routes
router.get('/', showProducts);

router.get('/:id', getProduct);

router.post('/', [
    check('title').isLength({ min: 3 }),
    check('sector').isLength({ min: 3 }),
    check('category').isLength({ min: 3 }),
    check('image').isLength({ min: 3 }),
    check('status').isBoolean()
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        createProduct(req, res);
    }
})

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

router.delete('/', deleteProducts);


export default router;