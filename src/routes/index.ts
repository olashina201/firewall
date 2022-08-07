import { Router } from "express";
import { Register, Login, UpdateAmt } from "../handlers";


const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.put("/updateAmt", UpdateAmt);

export default router;
