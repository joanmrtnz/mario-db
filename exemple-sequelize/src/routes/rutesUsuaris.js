/**
 * rutesUsuaris.js
 * Definició de les rutes relacionades amb els usuaris
 */

const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/UsuariController');

/**
 * @swagger
 * /api/usuaris/crear:
 *   post:
 *     summary: Crea un nou usuari
 *     description: Endpoint per a la creació d'usuaris amb validació de dades i gestió de duplicats.
 *     tags: [Usuaris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 example: "nomUsuari"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuari@exemple.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "contrasenya123"
 *               nom:
 *                 type: string
 *                 example: "Nom Complet"
 *               idioma:
 *                 type: string
 *                 example: "ca"
 *     responses:
 *       201:
 *         description: Usuari creat amb èxit
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               missatge: "Usuari creat amb èxit"
 *               resultat:
 *                 id: 1
 *                 username: "nomUsuari"
 *                 email: "usuari@exemple.com"
 *                 nom: "Nom Complet"
 *                 data_registre: "2025-03-13T12:45:00.000Z"
 *                 idioma: "ca"
 *       400:
 *         description: Error de validació
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               codi: "ERROR_VALIDACIO"
 *               missatge: "Les dades proporcionades no compleixen els requisits"
 *               detalls:
 *                 - camp: "username"
 *                   error: "El nom d'usuari ha de tenir com a mínim 3 caràcters"
 *       409:
 *         description: Usuari duplicat
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               codi: "ERROR_DUPLICAT"
 *               missatge: "Ja existeix un usuari amb aquest nom d'usuari o email"
 *               detalls:
 *                 - camp: "email"
 *                   error: "Aquest email ja està registrat"
 */
router.post('/crear', usuariController.crearUsuari);

/**
 * @swagger
 * /api/usuaris/comentaris/{id_usuari}:
 *   get:
 *     summary: Obté els comentaris d'un usuari
 *     description: Retorna una llista de comentaris que ha fet un usuari amb informació del vídeo i del youtuber.
 *     tags: [Usuaris]
 *     parameters:
 *       - name: id_usuari
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID de l'usuari
 *     responses:
 *       200:
 *         description: Comentaris de l'usuari obtinguts amb èxit
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               missatge: "Comentaris de l'usuari obtinguts amb èxit"
 *               resultat:
 *                 - id: 1
 *                   contingut: "Gran tutorial, m'ha ajudat molt amb el meu projecte!"
 *                   video:
 *                     id: 3
 *                     titol: "Curso GRATIS de JAVASCRIPT desde cero (con ejercicios)"
 *                     url_video: "https://www.youtube.com/watch?v=e3x1W9r9-rk"
 *                     youtuber:
 *                       nom_canal: "Hola Mundo"
 *       404:
 *         description: Usuari no trobat
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               missatge: "No s'ha trobat cap usuari amb l'ID: 77"
 */
router.get('/comentaris/:id_usuari', usuariController.llistarComentaris);

module.exports = router;
