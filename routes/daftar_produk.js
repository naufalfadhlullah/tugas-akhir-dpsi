const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const Daftar_produk = require("../models/daftar_produk");
const { authenticate, authorize } = require("../middleware/auth");

// GET all products
router.get("/produk", authenticate, async (req, res) => {
  try {
    const produk = await Daftar_produk.findAll({
      include: [{ model: Admin }],
    });
    res.json(produk);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET product by ID
router.get("/produk/:id", authenticate, async (req, res) => {
  try {
    const produk = await Daftar_produk.findByPk(req.params.id, {
      include: [{ model: Admin }],
    });
    if (produk) {
      res.json(produk);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new product
router.post("/produk", authenticate, async (req, res) => {
  try {
    const { harga, stock, tanggal_ditambahkan, adminID } = req.body;
    const newProduct = await Daftar_produk.create({
      harga,
      stock,
      tanggal_ditambahkan,
      adminID,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a product by ID
router.put("/produk/:id", authenticate, async (req, res) => {
  try {
    const { harga, stock, tanggal_ditambahkan, adminID } = req.body;
    const [updated] = await Daftar_produk.update(
      { harga, stock, tanggal_ditambahkan, adminID },
      { where: { produkID: req.params.id } }
    );
    if (updated) {
      const updatedProduct = await Daftar_produk.findByPk(req.params.id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a product by ID
router.delete("/produk/:id", authenticate, async (req, res) => {
  try {
    const deleted = await Daftar_produk.destroy({
      where: { produkID: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Product deleted" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
