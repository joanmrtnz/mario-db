/**
 * index.js de models
 * Configuració de les relacions entre els models
 */

const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const Youtuber = require('./Youtuber');
const PerfilYoutuber = require('./PerfilYoutuber');
const Video = require('./Video');
const Categoria = require('./Categoria');
const Comentari = require('./Comentari');
const Valoracio = require('./Valoracio');
const Usuari = require('./Usuari');


// Definir el model VideosCategories que servirà com a taula d'unió
const VideosCategories = sequelize.define('VideosCategories', {
  video_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Video,
      key: 'id'
    }
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Categoria,
      key: 'id'
    }
  }
}, {
  tableName: 'videos_categories',
  timestamps: false
});

// Relació 1:1 entre Youtuber i PerfilYoutuber
Youtuber.hasOne(PerfilYoutuber, { foreignKey: 'youtuber_id' });
PerfilYoutuber.belongsTo(Youtuber, { foreignKey: 'youtuber_id' });

// Relació 1:N entre Youtuber i Video
Youtuber.hasMany(Video, { foreignKey: 'youtuber_id' });
Video.belongsTo(Youtuber, { foreignKey: 'youtuber_id' });

// Relació N:M entre Video i Categoria
Video.belongsToMany(Categoria, { through: VideosCategories, foreignKey: 'video_id' });
Categoria.belongsToMany(Video, { through: VideosCategories, foreignKey: 'categoria_id' });



Usuari.hasMany(Comentari, { foreignKey: 'usuari_id' });
Comentari.belongsTo(Usuari, { foreignKey: 'usuari_id' });

Video.hasMany(Comentari, { foreignKey: 'video_id' });
Comentari.belongsTo(Video, { foreignKey: 'video_id' });

Usuari.hasMany(Valoracio, { foreignKey: 'usuari_id' });
Valoracio.belongsTo(Usuari, { foreignKey: 'usuari_id' });

Video.hasMany(Valoracio, { foreignKey: 'video_id' });
Valoracio.belongsTo(Video, { foreignKey: 'video_id' });

module.exports = {
  Usuari,
  Video,
  Comentari,
  Valoracio,
  Categoria,
  Youtuber,
  PerfilYoutuber,
  VideosCategories
};
