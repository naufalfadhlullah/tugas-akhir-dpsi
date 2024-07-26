const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Pemesanan = require("./pemesanan");
const Pembelian = sequelize.define(
  "Pembelian",
  {
    pembayaranID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    harga_total: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pemesananID: {
      type: DataTypes.INTEGER,
      allowNull : false,
      references: {
        model: Pemesanan,
        key: "pemesananID",
      },
    },
  },
  {
    timestamps: false,
  }
);

Pembelian.belongsTo(Pemesanan, { foreignKey: "pemesananID" });
Pemesanan.hasMany(Pembelian, { foreignKey: "pemesananID" });
module.exports = Pembelian;
