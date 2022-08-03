/**
 * @swagger
 * /admin/sim-category:
 *   post:
 *     summary: Add Sim Category
 *     tags:
 *       - Sim-Mall
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           type:
 *             type: number
 *           parent:
 *             type: string
 *           image:
 *             type: object
 *         example: {
 *           "name": "name",
 *           "parent": objectId,
 *           "image": {"name": "name.jpg", "small": "small.jpg", "medium": "medium.jpg", "large": "large.jpg"}
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
 * /admin/sim-category:
 *   put:
 *     summary: Update Sim Category
 *     tags:
 *       - Sim-Mall
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           type:
 *             type: number
 *           parent:
 *             type: string
 *           image:
 *             type: object
 *         example: {
 *           "name": "name",
 *           "parent": objectId,
 *           "image": {"name": "name.jpg", "small": "small.jpg", "medium": "medium.jpg", "large": "large.jpg"}
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
