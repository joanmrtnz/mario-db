const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuari = require('./Usuari');
const Video = require('./Video');

const Comentari = sequelize.define('Comentari', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  contingut: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'comentaris',
  timestamps: true
});
//Relació 1:N
Usuari.hasMany(Comentari, { foreignKey: 'usuari_id' });
Comentari.belongsTo(Usuari, { foreignKey: 'usuari_id' });
// Relació 1:N
Video.hasMany(Comentari, { foreignKey: 'video_id' });
Comentari.belongsTo(Video, { foreignKey: 'video_id' });

module.exports = Comentari;