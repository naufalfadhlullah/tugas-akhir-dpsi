const express = require('express');
const router = express.Router();
const admin = require("../models/admin");
const { authenticate, authorize } = require('../middleware/auth');

// GET all admins
router.get("/", authenticate, async (req, res) => {
  try {
    const admins = await admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET admin by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const adminData = await admin.findByPk(req.params.id);
    if (adminData) {
      res.json(adminData);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// saat menjalankan endpoint post dengan akun user maka tidak akan berhasil dan akan uncul massage forbiden
router.post("/", authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { username, password, telepon } = req.body;
    const newAdmin = await admin.create({ username, password, telepon });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update an admin by ID
router.put("/:id", authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { username, password, telepon } = req.body;
    const [updated] = await admin.update(
      { username, password, telepon },
      { where: { adminID: req.params.id } }
    );
    if (updated) {
      const updatedAdmin = await admin.findByPk(req.params.id);
      res.json(updatedAdmin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an admin by ID
router.delete("/:id", authenticate, authorize(['admin']), async (req, res) => {
  try {
    const deleted = await admin.destroy({ where: { adminID: req.params.id } });
    if (deleted) {
      res.json({ message: "Admin deleted" });
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
