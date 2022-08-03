/**
 * @swagger
 * /sim-category/:
 *   get:
 *     summary: Get sim category
 *     tags:
 *       - Sim-category
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
 *        name: sort
 *        type: string
 *        description: name:asc
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
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
 * /sim-category/filter:
 *   get:
 *     summary: Get setting filter
 *     tags:
 *       - Sim-category
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
 *        name: sort
 *        type: string
 *        description: name:asc
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
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
 * /sim-category/filter/detail:
 *   get:
 *     summary: Get setting filter detail
 *     tags:
 *       - Sim-category
 *     parameters:
 *      - in: query
 *        name: type
 *        type: number
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
 * /sim-category/detail/{id}:
 *   get:
 *     summary: Get sim category by id
 *     tags:
 *       - Sim-category
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *      - in: query
 *        name: sort
 *        type: string
 *      - in: query
 *        name: page
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

