const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuari = sequelize.define('Usuari', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_registre: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    idioma: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuaris' 
});

// id: Identificador únic (clau primària)
// username: Nom d'usuari per identificar-se (ha de ser únic)
// email: Correu electrònic (únic, per verificacions i recuperacions)
// password: Contrasenya (emmagatzemada en text pla per aquest exercici)
// nom: Nom real o complet
// data_registre: Data en què es va registrar l'usuari
// idioma: Idioma preferit per la interfície

module.exports = Usuari;