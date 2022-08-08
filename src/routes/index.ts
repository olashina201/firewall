import { Router } from "express";
import { Register, Login, UpdateAmt, getUser, deleteUser } from "../handlers";


const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.put("/updateAmt", UpdateAmt);
router.put("/updateAmt", UpdateAmt);
router.get("/getUser", getUser)
router.put("/deleteUser", deleteUser);

export default router;
