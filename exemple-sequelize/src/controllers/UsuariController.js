const { Usuari } = require('../models');
const { logger } = require('../config/logger');
const { Comentari, Video, Youtuber } = require('../models');

const crearUsuari = async (req, res, next) => {
  try {
    const { username, email, password, nom, idioma } = req.body;
    logger.info(`Petició per crear un usuari: ${username}`);

    // Validacio username
    if (!username || username.length < 3) {
      return res.status(400).json({
        ok: false,
        codi: "ERROR_VALIDACIO",
        missatge: "Les dades proporcionades no compleixen els requisits",
        detalls: [
          {
            camp: "username",
            error: "El nom d'usuari ha de tenir com a mínim 3 caràcters"
          }
        ]
      });
    }


    const usuariExisteix = await Usuari.findOne({
      where: {
        username: username
      }
    });

    const emailExisteix = await Usuari.findOne({
      where: {
        email: email
      }
    });

    if (usuariExisteix || emailExisteix) {
      return res.status(409).json({
        ok: false,
        codi: "ERROR_DUPLICAT",
        missatge: "Ja existeix un usuari amb aquest nom d'usuari o email",
        detalls: [
          ...(usuariExisteix ? [{ camp: "username", error: "Aquest username ja està registrat" }] : []),
          ...(emailExisteix ? [{ camp: "email", error: "Aquest email ja està registrat" }] : [])
        ]
      });
    }

    const nouUsuari = await Usuari.create({
      username,
      email,
      password,
      nom,
      data_registre: new Date(),
      idioma
    });

    res.status(201).json({
      ok: true,
      missatge: "Usuari creat amb èxit",
      resultat: {
        id: nouUsuari.id,
        username: nouUsuari.username,
        email: nouUsuari.email,
        nom: nouUsuari.nom,
        data_registre: nouUsuari.data_registre,
        idioma: nouUsuari.idioma
      }
    });

  } catch (error) {
    logger.error("Error creant usuari:", error);
    next(error);
  }
};

const llistarComentaris = async (req, res, next) => {
  try {
    const { id_usuari } = req.params;
    logger.info(`Petició per obtenir comentaris de l'usuari amb ID: ${id_usuari}`);

    const usuari = await Usuari.findByPk(id_usuari);
    if (!usuari) {
      return res.status(404).json({
        ok: false,
        missatge: `No s'ha trobat cap usuari amb l'ID: ${id_usuari}`
      });
    }

    const comentaris = await Comentari.findAll({
      where: { usuari_id: id_usuari },
      attributes: ['id', 'contingut'],
      include: [
        {
          model: Video,
          attributes: ['id', 'titol', 'url_video'],
          include: [
            {
              model: Youtuber,
              attributes: ['nom_canal']
            }
          ]
        }
      ]
    });

    res.status(200).json({
      ok: true,
      missatge: "Comentaris de l'usuari obtinguts amb èxit",
      resultat: comentaris
    });

  } catch (error) {
    logger.error(`Error obtenint comentaris de l'usuari ${req.params.id_usuari}:`, error);
    next(error);
  }
};

module.exports = {
  crearUsuari,
  llistarComentaris
};
