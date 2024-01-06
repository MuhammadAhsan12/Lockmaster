import express from "express";
const router = express.Router();
import {
  addPhone,
  getMyPhones,
  getPhoneById,
  getPhones,
  updatePhone,
} from "../controllers/phoneController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getPhones).post(protect, addPhone);
router.route("/:id/myphones").get(protect, getMyPhones);
router.route("/:id/status").put(updatePhone);
router.route("/:id").get(protect, admin, getPhoneById);

export default router;
