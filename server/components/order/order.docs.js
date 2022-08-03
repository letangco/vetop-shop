/**
 * @swagger
 * /orders/create:
 *   post:
 *     summary: Create
 *     tags:
 *       - Order
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
 *           special:
 *             type: number
 *           typeSpecial:
 *             type: number
 *           total:
 *             type: number
 *           description:
 *             type: string
 *           note:
 *             type: string
 *           type:
 *             type: number
 *         example: {
 *           "code": "1111",
 *           "special": 20,
 *           "total": 100,
 *           "description": "description",
 *           "note": "note",
 *           "typeSpecial": 1
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
 * /orders/payment-draff:
 *   put:
 *     summary: Create
 *     tags:
 *       - Order
 *     parameters:
 *       - name: id
 *         type: string
 *         in: path
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           orderId:
 *             type: string
 *         example: {
 *           "orderId": "1111"
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
 * /orders/list/:
 *   get:
 *     summary: Get Order By Store Token
 *     tags:
 *       - Order
 *     parameters:
 *       - name: limit
 *         type: number
 *         in: query
 *       - name: page
 *         in: query
 *         type: number
 *       - name: status
 *         in: query
 *         type: number
 *       - name: type
 *         in: query
 *         type: number
 *       - name: fromDay
 *         in: query
 *         type: date
 *       - name: toDay
 *         in: query
 *         type: date
 *       - name: sort
 *         in: query
 *         type: string
 *         description: createdAt:asc/desc,
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
 * /orders/detail/{id}:
 *   get:
 *     summary: Get Order By Store Id
 *     tags:
 *       - Order
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
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
 * /orders/detail/{id}:
 *   delete:
 *     summary: Delete Draft Order By Id
 *     tags:
 *       - Order
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
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
 * /orders/detail/{id}:
 *   get:
 *     summary: Get Order By Store Id
 *     tags:
 *       - Order
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
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
 * /orders/buyer-list/:
 *   get:
 *     summary: Get List Buyer
 *     tags:
 *       - Order
 *     parameters:
 *       - name: limit
 *         in: query
 *         type: number
 *       - name: page
 *         in: query
 *         type: number
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
 * /orders/buyer/detail/{id}:
 *   get:
 *     summary: Get Order by id
 *     tags:
 *       - Order
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
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
 * /orders/vetic-receive/:
 *   get:
 *     summary: Vetic receive
 *     tags:
 *       - Order
 *     parameters:
 *       - name: typeSpecial
 *         in: query
 *         required: true
 *       - name: total
 *         in: query
 *         required: true
 *       - name: special
 *         in: query
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
 * /orders/buyer:
 *   get:
 *     summary: Get Order Buyer By Token User
 *     tags:
 *       - Order
 *     parameters:
 *       - name: limit
 *         in: query
 *       - name: page
 *         in: query
 *       - name: type
 *         in: query
 *       - name: status
 *         in: query
 *       - name: fromDay
 *         in: query
 *         description: 12-15-2020
 *       - name: toDay
 *         in: query
 *         description: 12-30-2020
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
 * /orders/type-order/:
 *   get:
 *     summary: Get Type Order
 *     tags:
 *       - Order
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
 * /orders/status-order/:
 *   get:
 *     summary: Get Status Order
 *     tags:
 *       - Order
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
 * /orders/:
 *   put:
 *     summary: Update status order
 *     tags:
 *       - Order
*     parameters:
*       - name: body
*         in: body
*         required: true
*         properties:
*           orderId:
*             type: string
*           status:
*             type: string
*         example: {
*           "orderId": "12221212",
            "status": "accept"
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
 * /orders/sales/staff/{staffId}:
 *   get:
 *     summary: Get Sales List Of Staff
 *     tags:
 *       - Order
 *     parameters:
 *       - name: staffId
 *         in: path
 *         type: string
 *       - name: limit
 *         type: number
 *         in: query
 *       - name: page
 *         in: query
 *         type: number
 *       - name: string
 *         in: query
 *         type: number
 *       - name: type
 *         in: query
 *         type: number
 *       - name: fromDay
 *         in: query
 *         type: date
 *       - name: toDay
 *         in: query
 *         type: date
 *       - name: sort
 *         in: query
 *         type: string
 *         description: createdAt:asc/desc,
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
