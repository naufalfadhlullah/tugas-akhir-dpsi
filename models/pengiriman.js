const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Pembelian = require("./pembelian");
const Pengiriman = sequelize.define(
  "Pengiriman",
  {
    pengirimanID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tanggal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_pengiriman: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pembayaranID: {
      type: DataTypes.INTEGER,
      allowNull : false,
      references: {
        model: Pembelian,
        key: "pembayaranID",
      },
    },
  },
  {
    timestamps: false,
  }
);

Pengiriman.belongsTo(Pembelian, { foreignKey: "pembayaranID" });
Pembelian.hasMany(Pengiriman, { foreignKey: "pembayaranID" });
module.exports = Pengiriman;
