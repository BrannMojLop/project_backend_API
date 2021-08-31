import { Router } from "express";
const { check, validationResult } = require('express-validator');

const router = Router();

// Controllers
import { createSector, showSectors, getSector, deleteSector, deleteSectors, updateSector } from "../controllers/sectors";

// Routes
router.get('/', showSectors);

router.get('/:id', getSector);

router.post('/', [
    check('title').isLength({ min: 3 }),
    check('status').isBoolean()
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        createSector(req, res);
    }
})

router.put('/:id', updateSector);

router.delete('/:id', deleteSector);

router.delete('/', deleteSectors);


export default router;