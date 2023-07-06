import { Router } from "express";
import { Register, Login, updateAmt, getUser, deleteUser, withdrawAmt  } from "../handlers";


const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.put("/updateAmt", updateAmt);
router.put("/withdrawAmt", withdrawAmt);
router.get("/getUser", getUser);
router.put("/deleteUser", deleteUser);

export default router;
