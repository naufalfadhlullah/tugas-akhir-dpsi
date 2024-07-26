const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Admin = sequelize.define(
  "Admin",
  {
    adminID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telepon: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
{
    timestamps: false,
  }
);
module.exports = Admin;
