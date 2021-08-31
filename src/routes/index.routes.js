import { Router } from "express";

const router = Router();

// Routes
router.get('/', (req, res) => {
    res.send('Welcome to my new API!');
});


export default router;