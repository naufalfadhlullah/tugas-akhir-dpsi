const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Admin = require("./admin");
const Daftar_produk = sequelize.define(
  "Daftar_produk",
  {
    produkID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    harga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_ditambahkan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: "adminID",
      },
    },
  },
  {
    timestamps: false,
  }
);

Daftar_produk.belongsTo(Admin, {foreignKey : "adminID"});
Admin.hasMany(Daftar_produk, {foreignKey : "adminID"})
module.exports = Daftar_produk;
