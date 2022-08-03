/**
 * @swagger
 * /sim-order/create:
 *   post:
 *     summary: Create Order
 *     tags:
 *       - Sim - Order
 *     parameters:
 *       - name: id
 *         type: string
 *         in: path
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           code:
 *             type: string
 *           totalPrice:
 *             type: number
 *           totalVetic:
 *             type: number
 *           totalSpecial:
 *             type: number
 *           description:
 *             type: string
 *           note:
 *             type: string
 *           simList:
 *             type: array
 *         example: {
 *           "code": "1111",
 *           "simList": [{"_id": "objectId", "price": 10, "special": 50, "sim": 0999999}],
 *           "totalPrice": 100,
 *           "totalVetic": 100,
 *           "description": "description",
 *           "note": "note",
 *           "totalSpecial": 1
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
 * /sim-order/update-sim-from-order:
 *   put:
 *     summary: Update Sim From Order
 *     tags:
 *       - Sim - Order
 *     parameters:
 *       - name: id
 *         type: string
 *         in: path
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           simList:
 *             type: array
 *         example: {
 *           "simList": [{"_id": "objectId", "price": 10, "special": 50, "sim": 0999999}]
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
