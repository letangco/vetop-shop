/**
 * @swagger
 * /sim-mall-account/:
 *   post:
 *     summary: Create Sim Mall Account
 *     tags:
 *       - Sim-Mall
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           avatar:
 *             type: object
 *         example: {
 *           "name": "Loi Sim",
 *           "avatar": {
 *              "name": "name.jpg",
 *              "small": "small.jpg",
 *              "medium": "medium.jpg",
 *              "large": "large.jpg"
 *            }
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /sim-mall-account/:
 *   put:
 *     summary: Update Sim Mall Account
 *     tags:
 *       - Sim-Mall
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *         example: {
 *           "name": "Loi Sim"
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /sim-mall-account/:
 *   get:
 *     summary: Get Sim Mall Account
 *     tags:
 *       - Sim-Mall
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
