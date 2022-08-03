/**
 * @swagger
 * /payment-order/:
 *   get:
 *     summary: Get type payment order list
 *     tags:
 *       - Type Payment Order
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
 * /payment-order/{id}:
 *   get:
 *     summary: Get detail type payment for order shop
 *     tags:
 *       - Type Payment Order
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
