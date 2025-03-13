/**
 * rutesYoutuber.js
 * Definició de les rutes relacionades amb els youtubers
 */

const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/UsuariController');

router.post('/crear', usuariController.crearUsuari);
router.get('/comentaris/:id_usuari', usuariController.llistarComentaris);

/**
 * @swagger
 * /api/youtubers:
 *   get:
 *     summary: Obté tots els youtubers
 *     description: Retorna una llista amb tots els youtubers
 *     tags: [Youtubers]
 *     responses:
 *       200:
 *         description: Llista de youtubers obtinguda amb èxit
 *       500:
 *         description: Error intern del servidor
 */
// router.get('/', usuariController.obtenirTots);



module.exports = router;