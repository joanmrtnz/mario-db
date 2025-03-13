const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuari = require('./Usuari');
const Video = require('./Video');

const Valoracio = sequelize.define('Valoracio', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tipus: {
    type: DataTypes.ENUM('like', 'dislike'),
    allowNull: false
  }
}, {
  tableName: 'valoracio',
  timestamps: true,
  uniqueKeys: {
    //
    accions_uniques: {
      fields: ['usuari_id', 'video_id']
    }
  }
});

Usuari.hasMany(Valoracio, { foreignKey: 'usuari_id' });
Valoracio.belongsTo(Usuari, { foreignKey: 'usuari_id' });

Video.hasMany(Valoracio, { foreignKey: 'video_id' });
Valoracio.belongsTo(Video, { foreignKey: 'video_id' });

module.exports = Valoracio;
