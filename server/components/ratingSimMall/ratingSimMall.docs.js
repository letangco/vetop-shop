/**
 * @swagger
 * /rating-sim-mall/:
 *   post:
 *     summary: Add Rating
 *     tags:
 *       - Sim-Mall
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           owner:
 *             type: string
 *           typeOwner:
 *             type: string
 *           comment:
 *             type: string
 *           rating:
 *             type: number
 *         example: {
 *           "owner": "objectId",
 *           "typeOwner": "string",
 *           "comment": "comment",
 *           "rating": 5
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
 * /rating-sim-mall/store/{id}:
 *   get:
 *     summary: get rating sim mall
 *     tags:
 *       - Sim-mall
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of country the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of country page. Page default is 1
 *      - in: query
 *        name: sort
 *        type: string
 *        description: name:asc
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
