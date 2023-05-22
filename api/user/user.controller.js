const { DB_TABLES: { USER }, sequelize_connection } = require('../../db/sql.connect')

class UserController {

  /**
   * User Login
   * @param {*} req: Request
   * @param {*} res: Response
   * @returns 
   */

  async login(req, res) {
    try {

      const { email, role, password } = req.body;

      const user = await USER.findOne({ where: { email, role }, raw: true, attributes: ['email', 'name', 'role', 'password'] });
      if (!user) return res.fail({ statusCode: 400, message: 'user not found!' });

      if (user.password !== password) {
        return res.fail({ statusCode: 400, message: 'Invalid Password!' });
      }

      delete user.password;

      res.ok({
        message: "User logged-in successfully.",
        data: user
      });

    } catch (err) {

      res.fail({
        message: 'Something went wrong!',
        error: err.message
      });

    }
  }

  /**
   * Register
   * @param {*} req: Request
   * @param {*} res: Response
   * @returns 
   */

  async register(req, res) {
    try {

      const { email } = req.body;

      const user = await USER.findOne({ where: { email }, raw: true, attributes: ['email', 'name', 'role', 'password'] });
      if (user) return res.fail({ statusCode: 400, message: `User already registerd as ${user.role}! ` });

      const userDetails = req.body;

      const registrationDetails = await USER.create(userDetails);

      delete userDetails.password;

      if (!registrationDetails) return res.fail({ statusCode: 200, message: 'Falied to register new user!' });

      res.ok({
        message: "User registered successfully.",
        data: userDetails
      });

    } catch (err) {

      res.fail({
        message: 'Something went wrong! Failed to register user!',
        error: err.message
      });

    }
  }
}

module.exports = new UserController()
