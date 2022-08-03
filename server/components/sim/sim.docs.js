/**
 * @swagger
 * /sim-mall/:
 *   post:
 *     summary: Add Sim
 *     tags:
 *       - Sim-Mall
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           sim:
 *             type: string
 *           price:
 *             type: number
 *           vetic:
 *             type: number
 *           pin:
 *             type: number
 *           special:
 *             type: number
 *           categories:
 *             type: array
 *           tax:
 *             type: number
 *           code:
 *             type: string
 *         example: {
 *           "sim": "0933127561",
 *           "vetic": 100,
 *           "price": 100,
 *           "pin": 100,
 *           "special": 10,
 *           "categories": ["objectId"],
 *           "tax": 20,
 *           "code": "123456"
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
 * /sim-mall/change-status:
 *   put:
 *     summary: Change status sim
 *     tags:
 *       - Sim-Mall
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           simId:
 *             type: string
 *           typeSim:
 *             type: number
 *           status:
 *             type: number
 *           categories:
 *             type: array
 *           description:
 *             type: string
 *           price:
 *             type: number
 *           vetic:
 *             type: number
 *           special:
 *             type: number
 *         example: {
 *           "simId": "objectId",
 *           "status": 1,
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
 * /sim-mall/detail/{id}:
 *   delete:
 *     summary: Delete
 *     tags:
 *       - Sim-Mall
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
 * /sim-mall/:
 *   get:
 *     summary: get sim
 *     tags:
 *       - Sim-mall
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
 *        name: categories
 *        type: string
 *        description: text search
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: filterVetic
 *        type: string
 *      - in: query
 *        name: filterPrice
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
 * /sim-mall/history/{sim}:
 *   get:
 *     summary: get sim
 *     tags:
 *       - Sim-mall
 *     parameters:
 *      - in: path
 *        name: sim
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
 *      - in: query
 *        name: categories
 *        type: string
 *        description: text search
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: filterVetic
 *        type: string
 *      - in: query
 *        name: filterPrice
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
 * /sim-mall/detail/{id}:
 *   get:
 *     summary: get detail sim
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
 *      - in: query
 *        name: categories
 *        type: string
 *        description: text search
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
 * /sim-mall/token/:
 *   get:
 *     summary: get detail sim by token
 *     tags:
 *       - Sim-mall
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

/**
 * @swagger
 * /sim-mall/:
 *   get:
 *     summary: get sim
 *     tags:
 *       - Sim-mall
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
 *        name: categories
 *        type: string
 *        description: text search
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: filterVetic
 *        type: string
 *      - in: query
 *        name: filterPrice
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
 * /sim-mall/list/owner:
 *   get:
 *     summary: get sim owner
 *     tags:
 *       - Sim-mall
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
 *        name: categories
 *        type: string
 *        description: text search
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: filterVetic
 *        type: string
 *      - in: query
 *        name: filterPrice
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
