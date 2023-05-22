const { Config: { OTP_SPEC } } = require('../../common/config/config');
const { DB_TABLES: { QUESTION }, sequelize_connection } = require('../../db/sql.connect')

class questionController {

  /**
   * User Login
   * @param {*} req: Request
   * @param {*} res: Response
   * @returns 
   */

  async add(req, res) {
    try {

      const questionDetails = req.body;
      
      const result = await QUESTION.create(questionDetails);
      
      if (!result) return res.fail({ statusCode: 200, message: 'Failed to save question!' });

      res.ok({
        message: "Question saved successfully.",
        data: result
      });

    } catch (err) {

      res.fail({
        message: 'Failed to save question!',
        error: err.message
      });

    }
  }
}

module.exports = new questionController()
