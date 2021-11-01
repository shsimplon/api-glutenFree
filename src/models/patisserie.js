"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class patisserie extends Model {
    static associate(models) {
      // define association here
    }
  }
  patisserie.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT("long"),
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      lien: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "patisserie",
    }
  );
  return patisserie;
};
