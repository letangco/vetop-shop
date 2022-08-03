/**
 * @swagger
 * /admin/bank-management/:
 *   get:
 *     tags:
 *       - Admin - Bank
 *     summary: Get Bank List Vetop beneficiaries
 *     parameters:
 *       - name: "page"
 *         in: "query"
 *       - name: "limit"
 *         in: "query"
 *     responses:
 *       200:
 *         description: get Bank List info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Bank List info
 *           example: {
 *             'success': true,
 *             'payload': []
 *           }
*       404:
 *         description: Bank List not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "param": "ERR_NOT_FOUND"
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
 * /admin/bank-management/:
 *   post:
 *     tags:
 *       - Admin - Bank
 *     summary: Create Bank of system
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           bankName:
 *             type: string
 *           bankBranch:
 *             type: string
 *           accountName:
 *             type: string
 *           accountNumber:
 *             type: string
 *         example: {
 *           "accountNumber": 48484484848,
 *           "accountName": "Le Tang Co",
 *           "bankName": "ACB",
 *           "bankBranch": "Chi nhánh ACB"
 *         }
 *     responses:
 *       200:
 *         description: create bank info
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
 * /admin/bank-management/{id}:
 *   put:
 *     tags:
 *       - Admin - Bank
 *     summary: Update Bank of system
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of Bank
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           bankName:
 *             type: string
 *           accountName:
 *             type: string
 *           accountNumber:
 *             type: string
 *         example: {
 *           "accountNumber": 48484484848,
 *           "accountName": "Le Tang Co",
 *           "bankName": "ACB"
 *         }
 *     responses:
 *       200:
 *         description: Updated bank info
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
 * /admin/bank-management/{id}:
 *   get:
 *     tags:
 *       - Admin - Bank
 *     summary: Get Bank of system
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of Bank
 *         required: true
 *     responses:
 *       200:
 *         description: get bank info
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
 * /admin/bank-management/{id}:
 *   delete:
 *     tags:
 *       - Admin - Bank
 *     summary: Delete Bank of system
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of Bank
 *         required: true
 *     responses:
 *       200:
 *         description: deleted bank info
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
