const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Produk = require("./daftar_produk");
const Pemesanan = sequelize.define(
  "Pemesanan",
  {
    pemesananID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tanggal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah_produk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    produkID: {
      type: DataTypes.INTEGER,
      allowNull : false,
      references: {
        model: Produk,
        key: "produkID",
      },
    },
  },
  {
    timestamps: false,
  }
);

Pemesanan.belongsTo(Produk, { foreignKey: "produkID" });
Produk.hasMany(Pemesanan, { foreignKey: "produkID" });
module.exports = Pemesanan;
