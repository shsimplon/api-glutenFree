"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class jaime extends Model {
    static associate(models) {
      this.belongsTo(models.recette, {
        foreignKey: "recetteId",
      });
      this.belongsTo(models.user, {
        foreignKey: "userId",
      });
    }
  }
  jaime.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      recetteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "recettes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.UUID,

        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
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
      modelName: "jaime",
    }
  );
  return jaime;
};
