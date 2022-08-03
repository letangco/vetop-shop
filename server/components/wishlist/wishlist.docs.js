/**
 * @swagger
 * /wishlist/:
 *   get:
 *     summary: Get wishlist
 *     tags:
 *       - Wishlist
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
 *      - in: query
 *        name: fromDay
 *        type: string
 *      - in: query
 *        name: toDay
 *        type: string
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
 * /wishlist/store/:
 *   get:
 *     summary: Get wishlist of store
 *     tags:
 *       - Wishlist
 *     parameters:
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of country the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of country page. Page default is 1
 *      - in: query
 *        name: fromDay
 *        type: string
 *      - in: query
 *        name: toDay
 *        type: string
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
 * /wishlist/:
 *   post:
 *     summary: Add Wish List
 *     tags:
 *       - Wishlist
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           productId:
 *             type: string
 *         example: {
 *           "productId": "objectId"
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
 * /wishlist/{id}:
 *   delete:
 *     summary: Remove Product From Wishlist
 *     tags:
 *       - Wishlist
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
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
