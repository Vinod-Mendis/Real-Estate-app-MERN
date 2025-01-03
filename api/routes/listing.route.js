/** @format */

import express from "express";
import {
  createListing,
  deleteListing,
  fetchListingData,
  fetchListings,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/fetch/:id", fetchListingData);
router.get('/fetch', fetchListings)

export default router;
