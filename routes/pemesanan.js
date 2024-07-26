const express = require('express');
const router = express.Router();
const Pemesanan = require("../models/pemesanan");
const Daftar_produk = require("../models/daftar_produk");
const { authenticate } = require('../middleware/auth');

// GET all orders
router.get("/pemesanan", authenticate, async (req, res) => {
  try {
    const pemesanan = await Pemesanan.findAll({
      include: [{ model: Daftar_produk }],
    });
    res.json(pemesanan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET order by ID
router.get("/pemesanan/:id", authenticate, async (req, res) => {
  try {
    const pemesanan = await Pemesanan.findByPk(req.params.id, {
      include: [{ model: Daftar_produk }],
    });
    if (pemesanan) {
      res.json(pemesanan);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new order
router.post("/pemesanan", authenticate, async (req, res) => {
  try {
    const { tanggal, jumlah_produk, produkID } = req.body;
    const newOrder = await Pemesanan.create({
      tanggal,
      jumlah_produk,
      produkID,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update an order by ID
router.put("/pemesanan/:id", authenticate, async (req, res) => {
  try {
    const { tanggal, jumlah_produk, produkID } = req.body;
    const [updated] = await Pemesanan.update(
      { tanggal, jumlah_produk, produkID },
      { where: { pemesananID: req.params.id } }
    );
    if (updated) {
      const updatedOrder = await Pemesanan.findByPk(req.params.id);
      res.json(updatedOrder);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an order by ID
router.delete("/pemesanan/:id", authenticate, async (req, res) => {
  try {
    const deleted = await Pemesanan.destroy({ where: { pemesananID: req.params.id } });
    if (deleted) {
      res.json({ message: "Order deleted" });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
