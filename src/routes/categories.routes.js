import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

// Controllers
import { createCategory, showCategories, getCategory, deleteCategory, updateCategory, deleteCategories } from "../controllers/categories";

// Routes
router.get('/', showCategories);

router.get('/:id', getCategory);

router.post('/', [
    check('title').isLength({ min: 3 }),
    check('sector').isLength({ min: 3 }),
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

router.delete('/:id', deleteCategories);


export default router;