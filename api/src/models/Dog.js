const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height_max: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight_min: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight_max: {
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span_min: {
      type: DataTypes.STRING,
    },
    life_span_max: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.TEXT
    },  
    creadoEnDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {timestamps: false});
};