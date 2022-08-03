/**
 * @swagger
 * /admin/payment-order/:
 *   post:
 *     tags:
 *       - Admin - Payment Order
 *     summary: Create type payment Order for Shop
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         example: {
 *           "name": "Ví vetic điểm",
 *           "type": "vnpay",
 *           "description": "Thanh toán bằng ví VNPay",
 *           "image": {"name": "image.jpg","medium": "image.jpg","large": "image.jpg","small": "image.jpg"}
 *         }
 *     responses:
 *       200:
 *         description: create type payment for order
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
 * /admin/payment-order/{id}:
 *   put:
 *     tags:
 *       - Admin - Payment Order
 *     summary: Update type payment Order for Shop
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the type payment that needs to be update"
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         example: {
 *           "name": "Ví vetic điểm",
 *           "type": "vnpay",
 *           "description": "Thanh toán bằng ví VNPay",
 *           "image": {"name": "image.jpg","medium": "image.jpg","large": "image.jpg","small": "image.jpg"}
 *         }
 *     responses:
 *       200:
 *         description: create type payment for order
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
 * /admin/payment-order/:
 *   get:
 *     summary: Get type payment order list
 *     tags:
 *       - Admin - Payment Order
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number payment order the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number payment order page. Page default is 1
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
 * /admin/payment-order/{id}:
 *   delete:
 *     summary: Delete type payment for order shop
 *     tags:
 *       - Admin - Payment Order
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the type payment that needs to be delete"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your type payment delete
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: type payment not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy slide này.",
 *                      "param": "SLIDE_SHOW_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/payment-order/{id}/{status}:
 *   put:
 *     summary: Update status type payment for order shop
 *     tags:
 *       - Admin - Payment Order
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the type payment that needs to be delete"
 *         required: true
 *       - name: "status"
 *         in: "path"
 *         type: boolean
 *         description: "status of the type payment that needs to be delete"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your type payment delete
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: type payment not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy slide này.",
 *                      "param": "SLIDE_SHOW_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/payment-order/{id}:
 *   get:
 *     summary: Get detail type payment for order shop
 *     tags:
 *       - Admin - Payment Order
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the type payment that needs to be delete"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your type payment delete
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: type payment not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy slide này.",
 *                      "param": "SLIDE_SHOW_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
