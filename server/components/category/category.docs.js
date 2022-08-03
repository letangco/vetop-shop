/**
 * @swagger
 * /categories/detail/{id}:
 *   get:
 *     summary: Get category detail
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of category
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get category detail
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get category list
 *     tags:
 *       - Categories
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: keyword
 *        type: string
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of country the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of country page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get category list
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
 * /categories/store/{id}:
 *   get:
 *     summary: Get category by store id
 *     tags:
 *       - Categories
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: text search
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: keyword
 *        type: string
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of country the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of country page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get category list
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
 * /categories/:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create Categories Info
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           parent:
 *             type: string
 *           image:
 *             type: string
 *           icon:
 *             type: string
 *           color:
 *             type: string
 *         example: {
 *           "name": "Table",
 *           "description": "This is a table",
 *           "color": "#122323",
 *           "image": {"name": "image.jpg","medium": "image.jpg","large": "image.jpg","small": "image.jpg"},
 *           "icon": {"name": "image.jpg","medium": "image.jpg","large": "image.jpg","small": "image.jpg"},
 *           "parent": ""
 *         }
 *     responses:
 *       200:
 *         description: get country info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Country info
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
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update Categories Info
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           parent:
 *             type: string
 *           image:
 *             type: string
 *           icon:
 *             type: string
 *           color:
 *             type: string
 *         example: {
 *           "name": "Table",
 *           "description": "This is a table",
 *           "color": "#122323",
 *           "image": {"name": "image.jpg","medium": "image.jpg","large": "image.jpg","small": "image.jpg"},
 *           "icon": {"name": "image.jpg","medium": "image.jpg","large": "image.jpg","small": "image.jpg"},
 *           "parent": ""
 *         }
 *     responses:
 *       200:
 *         description: get country info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Country info
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
 * /categories/store-category/:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Add Category To Store
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           categoriesId:
 *             type: string
 *         example: {
 *           "categoriesId": ["objectId"]
 *         }
 *     responses:
 *       200:
 *         description: get country info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Country info
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
 * /categories/store/{id}:
 *   delete:
 *     summary: Delete category list of product
 *     tags:
 *       - Categories
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get category list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /categories/store-category/:
 *   get:
 *     summary: Get Category Of Store By Token
 *     tags:
 *       - Categories
 *     parameters:
 *      - in: query
 *        name: page
 *        type: number
 *      - in: query
 *        name: limit
 *        type: number
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get category list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

