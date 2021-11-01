"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recette extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "userId", as: "users" });
    }
  }
  recette.init(
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
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preparations: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      image: {
        type: DataTypes.TEXT("long"),
        // defaultValue: "./uploads/etablissements/random-.png"
      },
      video: {
        type: DataTypes.TEXT,
      },

      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,

        defaultValue: "0",
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
      modelName: "recette",
    }
  );
  return recette;
};
