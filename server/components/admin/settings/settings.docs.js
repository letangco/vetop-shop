/**
 * @swagger
 * /admin/settings/point-over-oder:
 *   put:
 *     tags:
 *       - Admin - Setting
 *     summary: Create or update point over discount of order
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           value:
 *             type: string
 *         example: {
 *           "value": 10000000
 *         }
 *     responses:
 *       200:
 *         description: updated over order point info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: over order point info
 *           example: {
 *             'success': true,
 *             'payload': []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/settings/point-over-oder:
 *   get:
 *     tags:
 *       - Admin - Setting
 *     summary: Get point over discount of order
 *     responses:
 *       200:
 *         description: get over order point info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: over order point info
 *           example: {
 *             'success': true,
 *             'payload': []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
