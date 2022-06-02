import { Router } from "express";
import { Register, Login } from "../handlers";


const router = Router()

router.post("/register", Register);
router.get("/login", Login)


export default router;